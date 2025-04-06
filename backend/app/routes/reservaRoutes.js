const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController.js');

router.post('/', reservaController.create);
router.get('/', reservaController.findAll);
router.get('/:id', reservaController.findOne);
router.put('/:id', reservaController.update);
router.delete('/:id', reservaController.delete);

module.exports = router;