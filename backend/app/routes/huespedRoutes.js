const express = require('express');
const router = express.Router();
const huespedcontroller = require('../controllers/huesped.controller.js');

router.post('/', huespedcontroller.create);
router.get('/', huespedcontroller.findAll);
router.get('/:id', huespedcontroller.findOne);
router.put('/:id', huespedcontroller.update);
router.delete('/:id', huespedcontroller.delete);

module.exports = router;