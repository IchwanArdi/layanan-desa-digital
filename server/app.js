const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://layanandesa.vercel.app'], // frontend
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

// Import Routes
const loginRoute = require('./routes/auth/login');
const registerRoute = require('./routes/auth/register');
const logoutRoute = require('./routes/auth/logout');
const dashboardProtectedRoutes = require('./routes/protected/dashboard');
const checkAuthRoute = require('./routes/auth/checkAuth');
const dashboardDataRoutes = require('./routes/api/dashboard');
const pengaduanDataRoute = require('./routes/api/pengaduan');
const ajukanDataRoute = require('./routes/api/ajukanData');

const totalPengaduan = require('./routes/api/totalPengaduan');
const totalAjukan = require('./routes/api/totalAjukanData');
const totalUser = require('./routes/api/dataUser');

// Routes
app.use('/api', loginRoute); // semua route diawali dengan /api
app.use('/api', registerRoute); // semua route diawali dengan /api
app.use('/api', logoutRoute); // tambahkan route logout
app.use('/api', dashboardProtectedRoutes); // semua mulai dari /api/dashboard akan diproteksi
app.use('/api', checkAuthRoute); // route untuk cek autentikasi
app.use('/api', dashboardDataRoutes);
app.use('/api', pengaduanDataRoute);
app.use('/api', ajukanDataRoute);

app.use('/api', totalPengaduan);
app.use('/api', totalAjukan);
app.use('/api', totalUser);

module.exports = app;
