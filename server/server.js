const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const modelRoutes = require('./routes/modelRoutes');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://your-netlify-url.netlify.app'], 
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/models', modelRoutes);

app.get('/', (req, res) => {
  res.send('AI Model Inventory Server is Running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});