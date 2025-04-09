const db = require("../configs/db"); // Asegúrate que index.js exporte los modelos
const Huesped = db.huesped;

// Crear un nuevo huésped
exports.create = async (req, res) => {
  try {
    const data = await Huesped.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al crear huésped", error: error.message });
  }
};

// Obtener todos los huéspedes
exports.findAll = async (req, res) => {
  try {
    const data = await Huesped.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener huéspedes", error: error.message });
  }
};

// Obtener un huésped por ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Huesped.findByPk(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Huésped no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al buscar huésped", error: error.message });
  }
};

// Actualizar un huésped por ID
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await Huesped.update(req.body, { where: { idHuesped: id } });
    if (updated) {
      const updatedHuesped = await Huesped.findByPk(id);
      res.status(200).json(updatedHuesped);
    } else {
      res.status(404).json({ message: "Huésped no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar huésped", error: error.message });
  }
};

// Eliminar un huésped por ID
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Huesped.destroy({ where: { idHuesped: id } });
    if (deleted) {
      res.status(200).json({ message: "Huésped eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Huésped no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar huésped", error: error.message });
  }
};
