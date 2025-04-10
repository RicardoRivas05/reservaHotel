const db = require('../configs/db');
const EstadoReserva = db.estadoreserva;

exports.findAll = async (req, res) => {
  try {
    const estados = await EstadoReserva.findAll();
    return res.status(200).json(estados);
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno al recuperar los estados de reserva.',
      error: error.message
    });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const estado = await EstadoReserva.findByPk(id);
    if (!estado) {
      return res.status(404).json({ message: `No se encontró el estado con ID ${id}` });
    }
    return res.status(200).json(estado);
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno al buscar el estado de reserva.',
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  const { estado } = req.body;
  if (!estado || estado.trim() === '') {
    return res.status(400).json({ message: 'El campo "estado" es obligatorio.' });
  }
  try {
    const nuevoEstado = await EstadoReserva.create({ estado });
    return res.status(201).json({
      message: 'Estado de reserva creado correctamente.',
      data: nuevoEstado
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno al crear el estado de reserva.',
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  if (!estado || estado.trim() === '') {
    return res.status(400).json({ message: 'El campo "estado" es obligatorio.' });
  }
  try {
    const estadoActualizado = await EstadoReserva.update(
      { estado },
      { where: { idEstadoReserva: id } }
    );
    if (estadoActualizado[0] === 0) {
      return res.status(404).json({ message: `No se encontró el estado con ID ${id}` });
    }
    const estadoFinal = await EstadoReserva.findByPk(id);
    return res.status(200).json({
      message: 'Estado de reserva actualizado correctamente.',
      data: estadoFinal
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno al actualizar el estado de reserva.',
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const eliminado = await EstadoReserva.destroy({ where: { idEstadoReserva: id } });
    if (!eliminado) {
      return res.status(404).json({ message: `No se encontró el estado con ID ${id}` });
    }
    return res.status(200).json({
      message: 'Estado de reserva eliminado correctamente.'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno al eliminar el estado de reserva.',
      error: error.message
    });
  }
};