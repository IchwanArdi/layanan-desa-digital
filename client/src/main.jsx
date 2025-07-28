import { StrictMode } from 'react'; // StrictMode untuk deteksi masalah di React
import { createRoot } from 'react-dom/client'; // createRoot untuk React 18
import { ToastContainer } from 'react-toastify'; // untuk notifikasi
import 'react-toastify/dist/ReactToastify.css'; // impor CSS notifikasi
import IndexHomePage from './components/HomePage/index.jsx';
import IndexDesaDigital from './components/DesaDigital/index.jsx';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage.jsx';
import RegisterPage from './components/Login/RegisterPage.jsx';
import DashboardPage from './components/HalamanUtama/DashboardPage.jsx';
import './App.css';

// Solusi: Flat Routes - Cocok untuk struktur komponen Anda
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/home" replace />,
  },
  {
    path: '/home',
    element: <IndexHomePage />,
  },
  {
    path: '/desa-digital',
    element: <IndexDesaDigital />,
  },
  {
    path: '/desa-digital/ajukan-data',
    element: <IndexDesaDigital />,
  },
  {
    path: '/desa-digital/pengaduan-warga',
    element: <IndexDesaDigital />,
  },
  {
    path: '/desa-digital/lacak-pengajuan',
    element: <IndexDesaDigital />,
  },
  {
    path: '/desa-digital/survei-kepuasan',
    element: <IndexDesaDigital />,
  },

  // Halaman Login dan Register
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
  {
    path: '/auth/register',
    element: <RegisterPage />,
  },

  // Halaman Dashboard
  {
    path: '/desa-digital/dashboard',
    element: <DashboardPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer position="top-right" autoClose={3000} theme="dark" />
  </StrictMode>
);
