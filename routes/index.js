const UserController = require('../controllers/UserController');
const CompanyController = require('../controllers/CompanyController');
const CondominiumController = require('../controllers/CondominiumController');
const passport = require('passport');
const custom = require('../middleware/custom');
const path = require('path')
require('../middleware/passport')(passport)

const routes = [
    {
        method: 'GET',
        url: '/users',
        handler: UserController.getAll
    },
    {
        method: 'GET',
        url: '/users/:id',
        handler: UserController.getSingleUser
    },
    {
        method: 'POST',
        url: '/users',
        handler: UserController.createUser
    },
    {
        method: 'PUT',
        url: '/users/:id',
        handler: UserController.updateUser
    },
    {
        method: 'DELETE',
        url: '/users/:id',
        handler: UserController.deleteUser
    },
    {
        method: 'GET',
        url: '/condominiums',
        handler: CondominiumController.getCondos
    },
    {
        method: 'GET',
        url: '/condominiums/:id',
        handler: CondominiumController.getSingleCondo
    },
    {
        method: 'POST',
        url: '/condominiums',
        handler: CondominiumController.createCondo
    },
    {
        method: 'PUT',
        url: '/condominiums/:id',
        handler: CondominiumController.updateCondo
    },
    {
        method: 'DELETE',
        url: '/condominiums/:id',
        handler: CondominiumController.deleteCondo
    },
    {
        method: 'GET',
        url: '/deletall',
        handler: UserController.deleteAll
    },
    {
        method: 'POST',
        url: '/users/register',
        handler: UserController.register
    },
    {
        method: 'GET',
        url: '/api/users',
        handler: UserController.create
    },
    {
        method: 'GET',
        url: '/companies',
        handler: CompanyController.getCompanies
    },
    {
        method: 'GET',
        url: '/companies/:id',
        handler: CompanyController.getSingleCompany
    }
]





module.exports = routes;
