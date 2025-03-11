'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');

function createToken(){
    const payload = {
        sub: UserActivation,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    }
    return jwt.encode(payload, process.env.SECRET_TOKEN);
}

function decodeToken(){
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.decode(token, process.env.SECRET_TOKEN);
    return decoded;
}

module.exports = {
    createToken,
    decodeToken
}