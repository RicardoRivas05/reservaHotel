'use strict'

const db = require('../configs/db');
const User = db.users;
const bcrypt = require('bcrypt');
const service = require('../services/services');
const { Op } = require('sequelize');

async function signUp(req, res) {
    let newPass = undefined;

    await bcrypt.genSalt(10)
        .then(async salts => {
            await bcrypt.hash(req.body['pass'], salts)
                .then(hash => newPass = hash)
                .catch(error => console.error(error))
        })
        .catch(error => console.error(error));

    User.create({
        userId: req.body['userId'],
        usuario: req.body['usuario'],
        pass: newPass,
    })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Sucedio un error inesperado'
            });
        });
}

async function signIn(req, res) {
    const usuario = req.body['usuario'];
    var condition = usuario ? { usuario: { [Op.eq]: `${usuario}` } } : null;
    try {
        const data = await User.findOne({ where: condition });
        if (!data) { 
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }
        
        // Usa compareSync correctamente (sin callback)
        const result = req.body['password'] === data['pass'];
        if (result) {
            return res.status(200).send({
                message: 'Logged in',
                userId: data['userId'],
                token: service.createToken(data['userId']),
            });
        } else {
            return res.status(401).send({
                message: 'Contraseña incorrecta',
            });
        }
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Sucedió un error al obtener los registros del usuario"
        });
    }
}

module.exports = { signUp, signIn }