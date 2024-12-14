const GalleryRepository = require("../repositories/GalleryRepository");

class GalleryActions {
  static async fetchPhotos(req, res) {
    try {
      const photos = await GalleryRepository.getAll();
      res.json(photos);
    } catch (error) {
      console.error("Failed to fetch photos:", error);
      res.status(500).json({ error: "Failed to fetch photos." });
    }
  }

  static async deletePhoto(req, res) {
    try {
      const { id } = req.params;
      const deleted = await GalleryRepository.deleteById(id);
      if (deleted) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ error: "Photo not found." });
      }
    } catch (error) {
      console.error("Failed to delete photo:", error);
      res.status(500).json({ error: "Failed to delete photo." });
    }
  }
}

module.exports = GalleryActions;
