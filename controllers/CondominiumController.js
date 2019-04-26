const boom = require('boom');
const Condominium = require('../models/condominiums');

exports.getCondos = async (req, reply) => {
    try {
        const condo = await Condominium.find()
        return condo
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.getSingleCondo = async (req, reply) => {
    try {
        const id = req.params.id
        const condo = await Condominium.findById(id)
        return condo
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.createCondo = async (req, reply) => {
    return new Promise((resolver, reject) => {
        const condo = new Condominium(req.body);
        const saveCondo = cb => (err, condo) => {
            if (err) {
                reject(err);
                return
            }
            cb(condo);
        }
        const findCondo = record => {
            Condominium.find(record, (err, [admin]) => {
                if (err) {
                    reject(err);
                    return
                }
                reply.header("location", `condo/${condo._id}`);
                resolver({...JSON.parse(JSON.stringify(condo)), password: null})
            })
        }
        condo.save(savecondo(findcondo))
    })
}

exports.updateCondo = async (req, reply) => {
    try { 
        Condominium.findById(req.params.id, function (err, condo) {
            if (err)
                res.send(err);
            condo.firstName = req.body.firstName;
            condo.lastName = req.body.lastName;
            condo.state = req.body.state;
            condo.user = req.body.user;
            condo.password = req.body.password;
            condo.cedula = req.body.cedula;
            condo.save(function (err) {
            reply.send({
                    message: 'condo info updated',
                    data: condo
                });
            });
        });
    } catch (error) {
        throw boom.boomify(error)
    }
} 

exports.deleteCondo = async (req, reply) => {
    try {
        const id = req.params.id
        const condo = await Condominium.findByIdAndRemove(id)
        return condo 
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.deleteAll = async (req, reply) => {
    // dev 
  try{
        const condo = Condominium.deleteMany({});
        return condo; 
    } catch (error) {
        throw boom.boomify(error);
    }
}