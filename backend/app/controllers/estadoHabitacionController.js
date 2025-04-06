const db = require("../configs/db");
const estadoHabitacion = db.estadohabitacion;


// Crear estado habitacion
exports.create = async (req, res) => {
  try {
    const data = await estadoHabitacion.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el estado de habitación", error: error.message });
  }
};

// Obtener todas los registros de estado habitacion
exports.findAll = async (req, res) => {
  try {
    const data = await estadoHabitacion.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los estados de habitaciones", error: error.message });
  }
};

// Obtener un estado de habitacion por id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await estadoHabitacion.findByPk(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Estado de habitación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el estado de habitación", error: error.message });
  }
};

// Actualizar un estado habitacion
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await estadoHabitacion.update(req.body, { where: { idEstadoHabitacion: id } });
    if (updated) {
      const updatedEstadoHabitacion = await estadoHabitacion.findByPk(id);
      res.status(200).json(updatedEstadoHabitacion);
    } else {
      res.status(404).json({ message: "estado de habitación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el estado de habitación", error: error.message });
  }
};

// Eliminar una estado habitacion
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await estadoHabitacion.destroy({ where: { idEstadoHabitacion: id } });
    if (deleted) {
      res.status(200).json({ message: "Estado de habitación eliminada correctamente" });
    } else {
      res.status(404).json({ message: "Estado de habitación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el estado de habitación", error: error.message });
  }
};