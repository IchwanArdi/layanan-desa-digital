const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // ganti sesuai nama file router kamu

const app = express();

// Connect ke MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', // frontend
    credentials: true,
  })
);

// Gunakan route dari /routes/auth.js
app.use('/api', authRoutes); // semua route diawali dengan /api

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
