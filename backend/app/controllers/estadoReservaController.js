const db = require("../configs/db");
const EstadoReserva = db.estadoreserva;


// Crear un nuevo estado de reserva
exports.create = async (req, res) => {
  try {
    const data = await EstadoReserva.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el estado reserva", error: error.message });
  }
};

// Obtener todos los estados de reserva
exports.findAll = async (req, res) => {
  try {
    const data = await EstadoReserva.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los estados de reserva", error: error.message });
  }
};

// Obtener un estado de reserva por ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await EstadoReserva.findByPk(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Estado de reserva no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el estado de reserva", error: error.message });
  }
};

// Actualizar un estado de reserva
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await EstadoReserva.update(req.body, { where: { idEstadoReserva: id } });
    if (updated) {
      const updatedEstadoReserva = await EstadoReserva.findByPk(id);
      res.status(200).json(updatedEstadoReserva);
    } else {
      res.status(404).json({ message: "Estado de reserva no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el estado de reserva", error: error.message });
  }
};

// Eliminar un estado de reserva
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await EstadoReserva.destroy({ where: { idEstadoReserva: id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Estado de reserva no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el estado de reserva", error: error.message });
  }
};