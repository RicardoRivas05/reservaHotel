const db = require("../configs/db");
const DetalleReserva = db.detallereserva;


// Crear un nuevo detalle de reserva
exports.create = async (req, res) => {
  try {
    const data = await DetalleReserva.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el detalle de reserva", error: error.message });
  }
};

// Obtener todos los detalles de reserva
exports.findAll = async (req, res) => {
  try {
    const data = await DetalleReserva.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los detalles de reserva", error: error.message });
  }
};

// Obtener un detalle de reserva por ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await DetalleReserva.findByPk(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Detalle de reserva no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el detalle de reserva", error: error.message });
  }
};

// Actualizar un detalle de reserva
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await DetalleReserva.update(req.body, { where: { detalleReservaId: id } });
    if (updated) {
      const updatedDetalleReserva = await DetalleReserva.findByPk(id);
      res.status(200).json(updatedDetalleReserva);
    } else {
      res.status(404).json({ message: "Detalle de reserva no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el detalle de reserva", error: error.message });
  }
};

// Eliminar un detalle de reserva
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await DetalleReserva.destroy({ where: { detalleReservaId: id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Detalle de reserva no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el detalle de reserva", error: error.message });
  }
};