'use strict'

const express = require('express');
const router = express.Router();
const huespedController = require('../controllers/huespedController');

router.post('/', huespedController.create);
router.get('/', huespedController.findAll);
router.get('/:id', huespedController.findOne);
router.put('/:id', huespedController.update);
router.delete('/:id', huespedController.delete);

module.exports = router;