const Users = require('../models/users');
const Roles = require('../models/roles');
const boom = require('boom');
const authService = require('../services/auth.service');
const { to, ReE, ReS } = require('../services/util.service')
const path = require('path');
const fastify = require('fastify')()

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public')
})
exports.getAll = async (req, reply) => {

    try {
        
        const users = await Users.find({},'state firstName lastName username createdAt assignedCondominium roleId document password')
        return users
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.getSingleUser = async (req, reply) => {
    try {
        const id = req.params.id
        const user = await Users.findById(id)
        return user;
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.createUser = async (req, reply) => {
    reply.header('Content-Type', 'application/json');
    
    return new Promise((resolver, reject)=> {

    const user = new Users(req.body)
    const saveUser = cb => (err, user)=>{
        if(err){
            reject(err)
            return
        }
        cb(user)
    }
    const findUser = record =>{
        Users.find(record, (err, [user])=> {
            if(err){
                reject(err)
                return
            }

            reply.header("location", `user/${user._id}`)
            resolver({...JSON.parse(JSON.stringify(user)), password: null})
        })
    } 
    user.save(saveUser(findUser))

    })
}

exports.create = async (req, res) => {
} 

exports.updateUser = async (req, reply) => {
    try { 
        Users.findById(req.params.id, function (err, user) {
            if (err)
                res.send(err);
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.state = req.body.state;
            user.user = req.body.user;
            user.password = req.body.password
            user.save(function (err) {
            reply.send({
                    message: 'user info updated',
                    data: user
                });
            });
        });
    } catch (error) {
        throw boom.boomify(error)
    }
} 

exports.deleteUser = async (req, reply) => {
    try {
        const id = req.params.id
        const user = await Users.findByIdAndRemove(id)
        return user 
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.deleteAll = async (req, reply) => {
    // dev 
  try{
        const users = Users.deleteMany({});
        return users; 
    } catch (error) {
        throw boom.boomify(error);
    }
}

exports.assign = async (req, reply) => {
    const id = req.params.id;
    const user = await Users.findById(req.params.id, function (err, user) {
        if(err) {
            reply.send(err)
        }

        //condo id
        //validate role is manager
        // validate condo id true


    })
}

exports.register = async (req, reply) => {
    const username = req.body.username;
    const password = req.body.password;
    const hashCost = 10;
  
    try {
      const passwordHash = await bcrypt.hash(password, hashCost);
      const userDocument = new Users(req.body);
      await userDocument.save();
      
      reply.status(200).send(username);
      
    } catch (error) {
      reply.status(400).send({
        error: 'req body should take the form { username, password }',
      });
    }
}

