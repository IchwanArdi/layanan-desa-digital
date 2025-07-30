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
      maxAge: 14 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    },
  })
);

// Routes
const loginRoute = require('./routes/auth/login');
const registerRoute = require('./routes/auth/register');
const logoutRoute = require('./routes/auth/logout');
const dashboardRoutes = require('./routes/protected/dashboard');
const checkAuthRoute = require('./routes/auth/checkAuth');
app.use('/api', loginRoute); // semua route diawali dengan /api
app.use('/api', registerRoute); // semua route diawali dengan /api
app.use('/api', logoutRoute); // tambahkan route logout
app.use('/api', dashboardRoutes); // semua mulai dari /api/dashboard akan diproteksi
app.use('/api', checkAuthRoute); // route untuk cek autentikasi

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
