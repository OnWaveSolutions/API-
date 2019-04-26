

exports.getManagers = async (req, reply) => {
    try {
        const managers = await Manager.find()
        return managers
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.getSingleManager = async (req, reply) => {
    try {
        const id = req.params.id
        const manager = await Manager.findById(id)
        return manager
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.createManager = async (req, reply) => {
    return new Promise((resolver, reject) => {
        const manager = new Manager(req.body);
        const saveManager = cb => (err, manager) => {
            if (err) {
                reject(err);
                return
            }
            cb(manager);
        }
        const findManager = record => {
            Manager.find(record, (err, [admin]) => {
                if (err) {
                    reject(err);
                    return
                }
                reply.header("location", `manager/${manager._id}`);
                resolver({...JSON.parse(JSON.stringify(manager)), password: null})
            })
        }
        manager.save(saveManager(findManager))
    })
}







exports.updateManager = async (req, reply) => {
    try { 
        Manager.findById(req.params.id, function (err, manager) {
            if (err)
                res.send(err);
            manager.firstName = req.body.firstName;
            manager.lastName = req.body.lastName;
            manager.state = req.body.state;
            manager.user = req.body.user;
            manager.password = req.body.password;
            manager.cedula = req.body.cedula;
            manager.save(function (err) {
            reply.send({
                    message: 'Manager info updated',
                    data: manager
                });
            });
        });
    } catch (error) {
        throw boom.boomify(error)
    }
} 

exports.deleteManager = async (req, reply) => {
    try {
        const id = req.params.id
        const manager = await manager.findByIdAndRemove(id)
        return manager 
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.deleteAll = async (req, reply) => {
    // dev 
  try{
        const manager = Manager.deleteMany({});
        return manager; 
    } catch (error) {
        throw boom.boomify(error);
    }
}
