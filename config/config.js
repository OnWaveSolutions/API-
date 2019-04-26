require('dotenv').config();

let CONFIG = {}

CONFIG.app = process.env.APP || 'dev'
CONFIG.port = process.env.port || 1337;
JWT_ENCRYPTION="onwave123hash"
JWT_EXPIRATION=10000