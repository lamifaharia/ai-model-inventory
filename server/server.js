const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const modelRoutes = require('./routes/modelRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware: CORS Configuration
// Replace the placeholder URL with actual Vercel/Frontend URL once you have it
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174', 
    'https://your-frontend-project.vercel.app' 
  ], 
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/models', modelRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('AI Model Inventory Server is Running 🚀');
});

// Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});