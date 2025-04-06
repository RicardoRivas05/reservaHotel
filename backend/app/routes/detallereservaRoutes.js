const express = require('express');
const router = express.Router();
const detalleReservaController = require('../controllers/detallereservaController.js');

router.post('/', detalleReservaController.create);
router.get('/', detalleReservaController.findAll);
router.get('/:id', detalleReservaController.findOne);
router.put('/:id', detalleReservaController.update);

module.exports = router;
