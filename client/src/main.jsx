import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import IndexHomePage from './components/HomePage/index.jsx';
import IndexDesaDigital from './components/DesaDigital/index.jsx';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Deskripsi from './components/DesaDigital/sections/Deskripsi.jsx';

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
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
