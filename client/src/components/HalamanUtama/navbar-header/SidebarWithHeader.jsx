// components/Layout/SidebarWithHeader.jsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

function SidebarWithHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userName = JSON.parse(localStorage.getItem('user')); // Ambil data user dari localStorage
  const email = userName ? userName.email : 'email@gmail.com'; // Ambil email dari data user
  const userNameDisplay = userName ? userName.nama : 'Pengguna'; // Tampilkan nama pengguna atau default

  const getSectionFromPath = (pathname) => {
    if (pathname === '/dashboard' || pathname === '/dashboard/') return 'dashboard';
    if (pathname.includes('/dashboard/layanan-dokumen')) return 'layanan-dokumen';
    if (pathname.includes('/dashboard/pengajuan')) return 'pengajuan';
    if (pathname.includes('/dashboard/profil')) return 'profil';
    return 'dashboard';
  };

  const [currentSection, setCurrentSection] = useState(getSectionFromPath(location.pathname));

  useEffect(() => {
    setCurrentSection(getSectionFromPath(location.pathname));
    setIsSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (sectionKey) => {
    const routeMap = {
      dashboard: '/dashboard',
      'layanan-dokumen': '/dashboard/layanan-dokumen',
      pengajuan: '/dashboard/pengajuan',
      profil: '/dashboard/profil',
    };
    if (routeMap[sectionKey]) navigate(routeMap[sectionKey]);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  return (
    <>
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} userName={userNameDisplay} email={email} />
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} handleNavigation={handleNavigation} currentSection={currentSection} />
    </>
  );
}

export default SidebarWithHeader;
