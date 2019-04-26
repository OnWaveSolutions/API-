const fastify = require('fastify')({ logger: true });
const routes = require('./routes/index');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const bcrypt = require('bcrypt');
const fs = require('fs');
const secret = fs.readFileSync('./keys/private.key', 'utf8');

const UserModel = require('./models/users');

routes.forEach((route, index) => {
    fastify.route(route)
});

fastify.register(require('fastify-formbody'));
fastify.register(require('morgan')('dev'));
fastify.register(require('point-of-view'), {
  engine: {
    ejs: require('ejs')
  }
});

fastify.get('/', async (request, reply) => {
  return { message: "OnWave Solutions DR"}
});

fastify.get('/password', (req, reply) => {
  reply.view('./testviews/password.ejs', { text : 'text' })
})


mongoose.promise = global.Promise;
mongoose.set('debug', true);

mongoose.connect("mongodb://localhost:27017/condoapp", { useNewUrlParser: true})
        .then(() => console.log("Connected to MongoDB OK!"))
        .catch(err => console.log(`MongodDB connection failed => ${err}`));



const start = async () => {
    try {
        await fastify.listen(1337)
        fastify.log.info(`Server listening @ localhost:${fastify.server.address().port}`)
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}


start();





