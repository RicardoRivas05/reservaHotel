'use strict'

const express = require('express');
const router = express.Router();
const detalleReservaController = require('../controllers/detalleReservaController');

router.post('/', detalleReservaController.create);
router.get('/', detalleReservaController.findAll);
router.get('/:id', detalleReservaController.findOne);
router.put('/:id', detalleReservaController.update);
router.delete('/:id', detalleReservaController.delete);

module.exports = router;
