const mongoose = require("mongoose");

const cemeterySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    age: { type: Number },
    birthDate: { type: Date },
    deathDate: { type: Date },
    isNative: { type: Boolean, default: false },
    fatherName: { type: String },
    motherName: { type: String },
    guardianName: { type: String },
    image: { type: String }, // URL of uploaded image
    graveNumber: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    whereDied: { type: String },
    description: { type: String }, // optional
  },
  { timestamps: true }
);

module.exports = mongoose.model("CemeteryRecord", cemeterySchema);
