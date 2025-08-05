import { StrictMode } from 'react'; // StrictMode untuk deteksi masalah di React
import { createRoot } from 'react-dom/client'; // createRoot untuk React 18
import { ToastContainer } from 'react-toastify'; // untuk notifikasi
import 'react-toastify/dist/ReactToastify.css'; // impor CSS notifikasi
import ProtectedRoute from './components/HalamanUtama/Utils/ProtectedRoute.jsx'; // untuk proteksi route
import IndexHomePage from './components/HomePage/index.jsx';
import IndexDesaDigital from './components/DesaDigital/index.jsx';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage.jsx';
import RegisterPage from './components/Login/RegisterPage.jsx';
import IndexHalamanUtama from './components/HalamanUtama/Index.jsx';
import DashboardPage from './components/HalamanUtama/pages/DashboardPage.jsx';
import LayananDokumenPage from './components/HalamanUtama/pages/LayananDokumenPage.jsx';
import PengajuanPage from './components/HalamanUtama/pages/PengajuanPage.jsx';
import ProfilPage from './components/HalamanUtama/pages/ProfilPage.jsx';
import NotFoundPage from './components/404/NotFoundPage.jsx';
import AdminPage from './pages/AdminPage.jsx'; // Halaman Admin
import { SettingsProvider } from './contexts/SettingsContext.jsx';
import './App.css';

// Clean Professional URLs
const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexHomePage />, // langsung root sebagai homepage
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

  // Halaman Not Found
  {
    path: '*',
    element: <NotFoundPage />,
    key: 'not-found',
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

  // Dashboard Routes - Clean URLs
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <IndexHalamanUtama />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <DashboardPage />,
      },
      {
        path: 'layanan-dokumen',
        element: <LayananDokumenPage />,
      },
      {
        path: 'pengajuan',
        element: <PengajuanPage />,
      },
      {
        path: 'profil',
        element: <ProfilPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
        key: 'not-found',
      },
    ],
  },
  {
    path: '/admin/dashboard',
    element: <AdminPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SettingsProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </SettingsProvider>
  </StrictMode>
);
