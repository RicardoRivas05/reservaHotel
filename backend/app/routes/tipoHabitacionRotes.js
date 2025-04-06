const express = require("express");
const router = express.Router();
const tipoHabitacionController = require("../controllers/tipoHabitacionController");

router.post("/", tipoHabitacionController.create);
router.get("/", tipoHabitacionController.findAll);
router.get("/:id", tipoHabitacionController.findOne);
router.put("/:id", tipoHabitacionController.update);
router.delete("/:id", tipoHabitacionController.delete);

module.exports = router;
