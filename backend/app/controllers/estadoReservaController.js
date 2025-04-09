const db = require('../configs/db');
const EstadoReserva = db.estadoreserva;

exports.findAll = async (req, res) => {
  try {
    const data = await EstadoReserva.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const data = await EstadoReserva.findByPk(req.params.id);
    if (data) res.json(data);
    else res.status(404).json({ message: 'No encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await EstadoReserva.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await EstadoReserva.update(req.body, {
      where: { idEstadoReserva: req.params.id }
    });
    if (updated) {
      const data = await EstadoReserva.findByPk(req.params.id);
      res.json(data);
    } else {
      res.status(404).json({ message: 'No encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await EstadoReserva.destroy({
      where: { idEstadoReserva: req.params.id }
    });
    if (deleted) res.status(204).send();
    else res.status(404).json({ message: 'No encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};