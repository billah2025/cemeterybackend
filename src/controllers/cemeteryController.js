const CemeteryRecord = require("../models/CemeteryRecord");

// Create a new cemetery record
exports.createRecord = async (req, res) => {
  try {
    const record = await CemeteryRecord.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all records
exports.getRecords = async (req, res) => {
  try {
    const records = await CemeteryRecord.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single record by ID
exports.getRecordById = async (req, res) => {
  try {
    const record = await CemeteryRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a record
exports.updateRecord = async (req, res) => {
  try {
    const record = await CemeteryRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a record
exports.deleteRecord = async (req, res) => {
  try {
    const record = await CemeteryRecord.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
