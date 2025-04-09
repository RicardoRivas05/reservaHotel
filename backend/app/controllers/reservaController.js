const db = require("../configs/db");
const Reserva = db.reserva;


// Crear una nueva reserva
exports.create = async (req, res) => {
  try {
    const data = await Reserva.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la reserva", error: error.message });
  }
};

// Obtener todas las reservas
exports.findAll = async (req, res) => {
  try {
    const data = await Reserva.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reservas", error: error.message });
  }
};

// Obtener una reserva por ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Reserva.findByPk(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Reserva no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al buscar la reserva", error: error.message });
  }
};

// Actualizar una reserva
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await Reserva.update(req.body, { where: { idReserva: id } });
    if (updated) {
      const updatedReserva = await Reserva.findByPk(id);
      res.status(200).json(updatedReserva);
    } else {
      res.status(404).json({ message: "Reserva no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la reserva", error: error.message });
  }
};

// Eliminar una reserva
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Reserva.destroy({ where: { idReserva: id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Reserva no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la reserva", error: error.message });
  }
};