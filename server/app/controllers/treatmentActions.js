const TreatmentRepository = require("../../database/models/TreatmentRepository");

/**
 * Fetch all treatments.
 */
const getAllTreatments = async (req, res) => {
  try {
    const treatments = await TreatmentRepository.readAll();
    res.json(treatments);
  } catch (error) {
    console.error("Error fetching treatments:", error);
    res.status(500).json({ error: "Failed to fetch treatments." });
  }
};

/**
 * Fetch treatments by category.
 */
const getTreatmentsByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ error: "Category is required." });
    }

    const treatments = await TreatmentRepository.findByCategory(category);

    if (!treatments.length) {
      return res
        .status(404)
        .json({ error: "No treatments found for the given category." });
    }

    res.json(treatments);
  } catch (error) {
    console.error("Error fetching treatments by category:", error);
    res.status(500).json({ error: "Failed to fetch treatments by category." });
  }
};

/**
 * Add a new treatment.
 */
const addTreatment = async (req, res) => {
  try {
    const { name, category, duration_minutes, price, description } = req.body;

    if (!name || !category || !duration_minutes || !price) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const treatmentId = await TreatmentRepository.create({
      name,
      category,
      duration_minutes,
      price,
      description,
    });

    res
      .status(201)
      .json({ id: treatmentId, message: "Treatment created successfully." });
  } catch (error) {
    console.error("Error adding treatment:", error);
    res.status(500).json({ error: "Failed to add treatment." });
  }
};

/**
 * Update a treatment by ID.
 */
const updateTreatment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, duration_minutes, price, description } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Treatment ID is required." });
    }

    const updatedRows = await TreatmentRepository.update(id, {
      name,
      category,
      duration_minutes,
      price,
      description,
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Treatment not found." });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating treatment:", error);
    res.status(500).json({ error: "Failed to update treatment." });
  }
};

/**
 * Delete a treatment by ID.
 */
const deleteTreatment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Treatment ID is required." });
    }

    const deletedRows = await TreatmentRepository.delete(id);

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Treatment not found." });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting treatment:", error);
    res.status(500).json({ error: "Failed to delete treatment." });
  }
};

module.exports = {
  getAllTreatments,
  getTreatmentsByCategory,
  addTreatment,
  updateTreatment,
  deleteTreatment,
};
