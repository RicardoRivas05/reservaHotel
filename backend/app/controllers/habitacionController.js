const db = require("../configs/db");
const Habitacion = db.habitacion;

// Crear una nueva habitación
exports.create = async (req, res) => {
  try {
    const data = await Habitacion.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la habitación", error: error.message });
  }
};

// Obtener todas las habitaciones
exports.findAll = async (req, res) => {
  try {
    const data = await Habitacion.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las habitaciones", error: error.message });
  }
};

// Obtener una habitación por ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Habitacion.findByPk(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Habitación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al buscar la habitación", error: error.message });
  }
};

// Actualizar una habitación
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await Habitacion.update(req.body, { where: { idHabitacion: id } });
    if (updated) {
      const updatedHabitacion = await Habitacion.findByPk(id);
      res.status(200).json(updatedHabitacion);
    } else {
      res.status(404).json({ message: "Habitación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la habitación", error: error.message });
  }
};

// Eliminar una habitación
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Habitacion.destroy({ where: { idHabitacion: id } });
    if (deleted) {
      res.status(200).json({ message: "Habitación eliminada correctamente" });
    } else {
      res.status(404).json({ message: "Habitación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la habitación", error: error.message });
  }
};
