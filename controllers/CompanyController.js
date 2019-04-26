const boom = require('boom');
const Company = require('../models/companies');

exports.getCompanies = async (req, reply) => {
    try {
        const company = await Company.find()
        return company
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.getSingleCompany = async (req, reply) => {
    try {
        const id = req.params.id
        const company = await Company.findById(id)
        return company
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.createCompany = async (req, reply) => {
    return new Promise((resolver, reject) => {
        const company = new Company(req.body);
        const saveCompany = cb => (err, condo) => {
            if (err) {
                reject(err);
                return
            }
            cb(company);
        }
        const findCompany = record => {
            Company.find(record, (err, [fCompany]) => {
                if (err) {
                    reject(err);
                    return
                }
                reply.header("location", `company/${fCompany._id}`);
                resolver({...JSON.parse(JSON.stringify(fCompany)), password: null})
            })
        }
        condo.save(savecondo(findCompany))
    })
}
/*
exports.updateCompany = async (req, reply) => {
    try { 
        Company.findById(req.params.id, function (err, condo) {
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
*/
exports.deleteCompany = async (req, reply) => {
    try {
        const id = req.params.id
        const company = await Company.findByIdAndRemove(id)
        return company
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.deleteAll = async (req, reply) => {
    // dev 
  try{
        const company = Company.deleteMany({});
        return company; 
    } catch (error) {
        throw boom.boomify(error);
    }
}