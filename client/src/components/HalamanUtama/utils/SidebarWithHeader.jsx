// SidebarWithHeader.jsx
import logo from '../../../assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LogOut, User, Home, FileText, MessageSquare, X, Menu } from 'lucide-react';
import { navItems } from './data';

function SidebarWithHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data user - nanti bisa diganti dengan data dari API atau props
  const userName = 'Ahmad Suharto';

  const getSectionFromPath = (pathname) => {
    if (pathname === '/dashboard' || pathname === '/dashboard/') return 'dashboard';
    if (pathname.includes('/dashboard/layanan-dokumen')) return 'layanan-dokumen';
    if (pathname.includes('/dashboard/pengajuan')) return 'pengajuan';
    if (pathname.includes('/dashboard/profil')) return 'profil';
    return 'dashboard'; // Default section
  };

  // Function untuk mendapatkan title berdasarkan route
  const getPageTitle = (pathname) => {
    if (pathname === '/dashboard' || pathname === '/dashboard/') return 'Dashboard';
    if (pathname.includes('/dashboard/layanan-dokumen')) return 'Layanan Dokumen';
    if (pathname.includes('/dashboard/pengajuan')) return 'Pengajuan';
    if (pathname.includes('/dashboard/profil')) return 'Profil';
    return 'Dashboard'; // Default title
  };

  const [currentSection, setCurrentSection] = useState(getSectionFromPath(location.pathname));

  useEffect(() => {
    setCurrentSection(getSectionFromPath(location.pathname));
  }, [location.pathname]);

  // Close sidebar when route changes (untuk mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Handle resize untuk auto-close sidebar di desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (sectionKey) => {
    // Navigasi ke route yang sesuai
    const routeMap = {
      dashboard: '/dashboard',
      'layanan-dokumen': '/dashboard/layanan-dokumen',
      pengajuan: '/dashboard/pengajuan',
      profil: '/dashboard/profil',
    };

    // Navigate ke route yang sesuai
    if (routeMap[sectionKey]) {
      navigate(routeMap[sectionKey]);
    }

    // Close sidebar setelah navigasi di mobile
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Function untuk mendapatkan icon component berdasarkan nama
  const getIconComponent = (iconName) => {
    const icons = {
      Home: <Home size={20} />,
      FileText: <FileText size={20} />,
      MessageSquare: <MessageSquare size={20} />,
      User: <User size={20} />,
    };
    return icons[iconName];
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <>
      {/* Header / Navbar */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30 lg:ml-64">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200" aria-label="Toggle Sidebar">
              <Menu className="h-5 w-5 text-gray-600" />
            </button>

            {/* Page Title */}
            <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* User Greeting */}
            <span className="text-sm font-medium text-gray-700">Halo, {userName}!</span>
          </div>
        </div>
      </header>

      {/* Overlay untuk Mobile */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeSidebar} />

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`} id="sidebar">
        {/* Header dengan tombol close untuk mobile */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-13 h-13 rounded-full flex items-center justify-center">
              <img src={logo} alt="Logo" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800">Karangpucung</h2>
              <p className="text-sm text-gray-600">Portal Desa</p>
            </div>
          </div>

          {/* Tombol Close untuk Mobile */}
          <button onClick={closeSidebar} className="lg:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200" aria-label="Close Sidebar">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Navigasi Sidebar */}
        <nav className="mt-6">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavigation(item.key)}
              className={`w-full flex items-center space-x-3 px-6 py-4 transition-all duration-200 text-left group ${
                currentSection === item.key ? 'bg-green-100 text-green-600 border-r-4 border-green-600' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className={`transition-colors duration-200 ${currentSection === item.key ? 'text-green-600' : 'text-gray-500 group-hover:text-gray-700'}`}>{getIconComponent(item.icon)}</div>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-6 right-6">
          <a href="/home" className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 group">
            <LogOut className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200" />
            <span className="group-hover:text-gray-900 transition-colors duration-200">Keluar</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default SidebarWithHeader;
