const express = require('express');
const router = express.Router();
const estadoReservaController = require('../controllers/estadoReservaController');

router.post('/', estadoReservaController.create);
router.get('/', estadoReservaController.findAll);
router.get('/:id', estadoReservaController.findOne);
router.put('/:id', estadoReservaController.update);
router.delete('/:id', estadoReservaController.delete);

module.exports = router;