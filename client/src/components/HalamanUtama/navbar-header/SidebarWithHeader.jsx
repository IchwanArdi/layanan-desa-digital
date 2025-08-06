import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useSettings } from '../../../contexts/SettingsContext';

function SidebarWithHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSettings(); // Ambil data user dari context global

  const role = user?.role || null; // Ambil role (admin/user)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Status buka/tutup sidebar

  // Ambil data user dari localStorage (untuk tampilan nama & email di header)
  const userData = JSON.parse(localStorage.getItem('user'));
  const email = userData?.email || 'email@gmail.com';
  const userNameDisplay = userData?.nama || 'Pengguna';

  // Fungsi untuk deteksi halaman aktif berdasarkan URL dan role
  const getSectionFromPath = (pathname) => {
    const isAdmin = role === 'admin';

    if (isAdmin) {
      if (pathname.startsWith('/admin/pengajuan')) return 'pengajuan';
      if (pathname.startsWith('/admin/pengaduan')) return 'pengaduan';
      if (pathname.startsWith('/admin/profile')) return 'profil';
      return 'dashboard';
    } else {
      if (pathname.startsWith('/dashboard/layanan-dokumen')) return 'layanan-dokumen';
      if (pathname.startsWith('/dashboard/pengaduan')) return 'pengaduan';
      if (pathname.startsWith('/dashboard/profil')) return 'profil';
      return 'dashboard';
    }
  };

  // Daftar menu berdasarkan role (user/admin)
  const navItems =
    role === 'admin'
      ? [
          { key: 'dashboard', icon: 'Home', label: 'Dashboard' },
          { key: 'pengajuan', icon: 'FileText', label: 'Pengajuan' },
          { key: 'pengaduan', icon: 'MessageSquare', label: 'Pengaduan' },
          { key: 'profil', icon: 'User', label: 'Profil' },
        ]
      : [
          { key: 'dashboard', icon: 'Home', label: 'Dashboard' },
          { key: 'layanan-dokumen', icon: 'FileText', label: 'Ajukan Data' },
          { key: 'pengaduan', icon: 'MessageSquare', label: 'Pengaduan' },
          { key: 'profil', icon: 'User', label: 'Profil' },
        ];

  const [currentSection, setCurrentSection] = useState(getSectionFromPath(location.pathname));

  // Update section saat URL berubah
  useEffect(() => {
    setCurrentSection(getSectionFromPath(location.pathname));
    setIsSidebarOpen(false); // Tutup sidebar otomatis saat berpindah halaman
  }, [location.pathname, role]);

  // Tutup sidebar otomatis saat ukuran layar besar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fungsi navigasi berdasarkan role dan menu yang diklik
  const handleNavigation = (sectionKey) => {
    const isAdmin = role === 'admin';
    const routeMap = isAdmin
      ? {
          dashboard: '/admin',
          pengajuan: '/admin/pengajuan',
          pengaduan: '/admin/pengaduan',
          profil: '/admin/profile',
        }
      : {
          dashboard: '/dashboard',
          'layanan-dokumen': '/dashboard/layanan-dokumen',
          pengaduan: '/dashboard/pengaduan',
          profil: '/dashboard/profil',
        };

    if (routeMap[sectionKey]) navigate(routeMap[sectionKey]);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  // Komponen utama yang merender header dan sidebar
  return (
    <>
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} userName={userNameDisplay} email={email} />
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} handleNavigation={handleNavigation} currentSection={currentSection} navItems={navItems} />
    </>
  );
}

export default SidebarWithHeader;
