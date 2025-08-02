const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
// const authRoutes = require('./routes/auth'); // ganti sesuai nama file router kamu
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

app.set('trust proxy', 1); // penting di Railway / Vercel

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14 hari
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // ✅ JANGAN pakai array
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // agar bisa lintas domain di Vercel, tapi tetap aman saat lokal
    },
  })
);

// Routes
const loginRoute = require('./routes/auth/login');
const registerRoute = require('./routes/auth/register');
const logoutRoute = require('./routes/auth/logout');
const dashboardProtectedRoutes = require('./routes/protected/dashboard');

const checkAuthRoute = require('./routes/auth/checkAuth'); // route untuk cek autentikasi
const dashboardDataRoutes = require('./routes/api/dashboard'); // route untuk data dashboard
const pengaduanDataRoute = require('./routes/api/pengaduan'); // route untuk pengaduan
const ajukanDataRoute = require('./routes/api/ajukanData'); // route untuk pengajuan dokumen

app.use('/api', loginRoute); // semua route diawali dengan /api
app.use('/api', registerRoute); // semua route diawali dengan /api
app.use('/api', logoutRoute); // tambahkan route logout
app.use('/api', dashboardProtectedRoutes); // semua mulai dari /api/dashboard akan diproteksi
app.use('/api', checkAuthRoute); // route untuk cek autentikasi

app.use('/api', dashboardDataRoutes);
app.use('/api', pengaduanDataRoute);
app.use('/api', ajukanDataRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
