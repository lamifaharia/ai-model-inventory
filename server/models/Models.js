const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  framework: { type: String, required: true },
  useCase: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['NLP', 'Computer Vision', 'Audio', 'Multimodal', 'Reinforcement Learning', 'Other'],
    default: 'Other'
  },
  dataset: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, default: 0 },
  createdBy: { type: String, required: true },
  purchasedBy: [{ type: String }],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  purchased: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Model', modelSchema);