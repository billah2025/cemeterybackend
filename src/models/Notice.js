// backend/models/Notice.js
const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now }, // creation date or event date
  type: { type: String, enum: ['notice', 'event'], default: 'notice' },
  image: { type: String }, // optional, URL or path
});

module.exports = mongoose.model('Notice', noticeSchema);
