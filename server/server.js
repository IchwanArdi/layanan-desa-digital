const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // ganti sesuai nama file router kamu
const session = require('express-session');
const MongoStore = require('connect-mongo'); // untuk menyimpan session di MongoDB
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// Connect ke MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://layanan-desa-digital.vercel.app'], // frontend
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // sambung ke MongoDB kamu
      ttl: 14 * 24 * 60 * 60, // waktu simpan session (detik)
    }),
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
  })
);

// Gunakan route dari /routes/auth.js
app.use('/api', authRoutes); // semua route diawali dengan /api

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
