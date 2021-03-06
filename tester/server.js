const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../keys');
const UserModel = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashCost = 10;

  try {
    const passwordHash = await bcrypt.hash(password, hashCost);
    const userDocument = new UserModel({ username, passwordHash });
    await userDocument.save();
    
    res.status(200).send({ username });
    
  } catch (error) {
    res.status(400).send({
      error: 'req body should take the form { username, password }',
    });
  }
});







router.get('/protected',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { user } = req;

    res.status(200).send({ user });
  });


router.post('/login', (req, res) => {
  passport.authenticate(
    'local',
    { session: false },
    (error, user) => {

      if (error || !user) {
        res.status(400).json({ error });
      }

      /** This is what ends up in our JWT */
      const payload = {
        username: user.username,
        expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
      };

      /** assigns payload to req.user */
      req.login(payload, {session: false}, (error) => {
        if (error) {
          res.status(400).send({ error });
        }

        /** generate a signed json web token and return it in the response */
        const token = jwt.sign(JSON.stringify(payload), keys.secret);

        /** assign our jwt to the cookie */
        res.cookie('jwt', jwt, { httpOnly: true, secure: true });
        res.status(200).send({ username });
      });
    },
  )(req, res);
});

module.exports = router;