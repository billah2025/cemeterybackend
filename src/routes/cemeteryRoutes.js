const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
} = require("../controllers/cemeteryController");

// Protected routes
router.post("/", protect, createRecord);
router.get("/", getRecords);
router.get("/:id", getRecordById);
router.put("/:id", protect, updateRecord);
router.delete("/:id", protect, deleteRecord);

module.exports = router;
