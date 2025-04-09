const db = require("../configs/db");
const tipoHabitacion = db.tipohabitacion;


// Crear tipo habitacion
exports.create = async (req, res) => {
  try {
    const data = await tipoHabitacion.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el tipo de habitación", error: error.message });
  }
};

// Obtener todas los registros de tipo habitacion
exports.findAll = async (req, res) => {
  try {
    const data = await tipoHabitacion.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los tipos de habitaciones", error: error.message });
  }
};

// Obtener un tipo de habitacion por id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await tipoHabitacion.findByPk(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Tipo de habitación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el tipo de habitación", error: error.message });
  }
};

// Actualizar un tipo habitacion
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await tipoHabitacion.update(req.body, { where: { idTipoHabitacion: id } });
    if (updated) {
      const updatedtipoHabitacion = await tipoHabitacion.findByPk(id);
      res.status(200).json(updatedtipoHabitacion);
    } else {
      res.status(404).json({ message: "Tipo de habitación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el tipo de habitación", error: error.message });
  }
};

// Eliminar una tipo habitacion
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await tipoHabitacion.destroy({ where: { idTipoHabitacion: id } });
    if (deleted) {
      res.status(200).json({ message: "Tipo de habitación eliminada correctamente" });
    } else {
      res.status(404).json({ message: "Tipo de habitación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el tipo de habitación", error: error.message });
  }
};
