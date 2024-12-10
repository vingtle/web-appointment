const express = require("express");
const upload = require("../../../services/galleryUpload");

const router = express.Router();

router.post("/upload", upload.single("photo"), (req, res) => {
  res.json({ filename: req.file.filename });
});

module.exports = router;
