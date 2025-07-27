const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // ganti sesuai nama file router kamu
const session = require('express-session');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

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

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback-secret',
    resave: false,
    saveUninitialized: true,
    // Tidak ada store, akan menggunakan memory store default
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14 hari dalam milliseconds
    },
  })
);

// Gunakan route dari /routes/auth.js
app.use('/api', authRoutes); // semua route diawali dengan /api

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
