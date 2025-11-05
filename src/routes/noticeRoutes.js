// backend/routes/noticeRoutes.js
const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");

// ✅ CREATE a new notice/event
router.post("/", async (req, res) => {
  try {
    const { title, description, date, type, image } = req.body;
    const notice = new Notice({ title, description, date, type, image });
    await notice.save();
    res.status(201).json(notice);
  } catch (error) {
    console.error("Error creating notice:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ READ all notices/events
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.status(200).json(notices);
  } catch (error) {
    console.error("Error fetching notices:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ READ single notice/event by ID
router.get("/:id", async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: "Not found" });
    res.status(200).json(notice);
  } catch (error) {
    console.error("Error fetching notice:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ UPDATE a notice/event
router.put("/:id", async (req, res) => {
  try {
    const { title, description, date, type, image } = req.body;
    const updatedNotice = await Notice.findByIdAndUpdate(
      req.params.id,
      { title, description, date, type, image },
      { new: true }
    );
    if (!updatedNotice) return res.status(404).json({ message: "Not found" });
    res.status(200).json(updatedNotice);
  } catch (error) {
    console.error("Error updating notice:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ DELETE a notice/event
router.delete("/:id", async (req, res) => {
  try {
    const deletedNotice = await Notice.findByIdAndDelete(req.params.id);
    if (!deletedNotice) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Notice deleted successfully" });
  } catch (error) {
    console.error("Error deleting notice:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
