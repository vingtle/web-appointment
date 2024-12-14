const express = require("express");
const upload = require("../../../services/galleryUpload");
const GalleryActions = require("../../../controllers/galleryActions");

const router = express.Router();

router.post("/upload", upload.single("photo"), (req, res) => {
  res.json({ filename: req.file.filename });
});

router.get("/photos", GalleryActions.fetchPhotos);
router.delete("/photos/:id", GalleryActions.deletePhoto);

module.exports = router;
