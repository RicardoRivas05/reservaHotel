'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');

function createToken(user) {
    const payload = {
        sub: user,
        iat: moment().unix(),
        exp: moment().add(15, 'days').unix()
    }
    return jwt.encode(payload, process.env.SECRET_TOKEN)
}

function decodeToken(token) {
    const decode = new Promise(function (resolve, reject) {
        try {
            const payload = jwt.decode(token, process.env.SECRET_TOKEN);
            if (payload.exp <= moment().unix()) {
                reject({ status: 401, message: "Token expirado" });
            }
            resolve(payload.sub);
        } catch (error) {
            reject({ status: 500, message: "Token invalido", errorMessage: error.message });
        }
    })
    return decode;
}

module.exports = { createToken, decodeToken };