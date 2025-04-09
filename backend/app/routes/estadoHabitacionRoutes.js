'use strict'

const express = require("express");
const router = express.Router();
const estadoHabitacionController = require("../controllers/estadoHabitacionController");

router.post('/', estadoHabitacionController.create);
router.get('/', estadoHabitacionController.findAll);
router.get('/:id', estadoHabitacionController.findOne);
router.put('/:id', estadoHabitacionController.update);
router.delete('/:id', estadoHabitacionController.delete);

module.exports = router;
