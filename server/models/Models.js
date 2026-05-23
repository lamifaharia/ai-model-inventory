const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  framework: { type: String, required: true },
  useCase: { type: String, required: true },
  dataset: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  purchased: { type: Number, default: 0 }
});

module.exports = mongoose.model('Model', modelSchema);