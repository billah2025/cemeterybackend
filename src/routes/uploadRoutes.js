
const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// ✅ Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where files will be saved
  },
  filename: (req, file, cb) => {
    // Create unique file name (timestamp + original extension)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ POST /api/upload — handle single image upload
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Build the public file URL
  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

module.exports = router;
