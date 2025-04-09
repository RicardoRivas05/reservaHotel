const express = require('express');
const router = express.Router();
const estadoReservaController = require('../controllers/estadoReservaController');

router.get('/', estadoReservaController.findAll);
router.get('/:id', estadoReservaController.findOne);
router.post('/', estadoReservaController.create);
router.put('/:id', estadoReservaController.update);
router.delete('/:id', estadoReservaController.delete);

module.exports = router;