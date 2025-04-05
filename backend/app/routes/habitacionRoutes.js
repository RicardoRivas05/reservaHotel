const express = require("express");
const router = express.Router();
const habitacionController = require("../controllers/habitacion.controller.js");

router.post("/", habitacionController.create);
router.get("/", habitacionController.findAll);
router.get("/:id", habitacionController.findOne);
router.put("/:id", habitacionController.update);
router.delete("/:id", habitacionController.delete);

module.exports = router;
