// components/Layout/Header.jsx
import { LogOut, Menu, User, Moon, Sun, Settings } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSettings } from '../../../contexts/SettingsContext.jsx'; // Import context untuk dark mode

export default function Header({ toggleSidebar, userName, email }) {
  const navigate = useNavigate(); // untuk navigasi ke halaman lain
  const { darkMode, setDarkMode } = useSettings(); // Ambil state darkMode dari context

  // Fungsi untuk toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Fungsi untuk menangani logout
  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        localStorage.removeItem('user'); // hapus session local
        navigate('/'); // redirect ke halaman utama/login
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Terjadi kesalahan saat logout');
    }
  };

  const location = useLocation();
  const [profilOpen, setProfilOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Ambil judul halaman berdasarkan pathname
  const getPageTitle = (pathname) => {
    if (pathname === '/dashboard' || pathname === '/dashboard/') return 'Dashboard';
    if (pathname.includes('/dashboard/layanan-dokumen')) return 'Layanan Dokumen';
    if (pathname.includes('/dashboard/pengajuan')) return 'Pengajuan';
    if (pathname.includes('/dashboard/profil')) return 'Profil';
    return 'Dashboard';
  };

  const pageTitle = getPageTitle(location.pathname);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfilOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`${darkMode ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-white text-gray-800 border-gray-200'} shadow-sm border-b sticky top-0 z-30 lg:ml-64`}>
      <div className="flex items-center justify-between px-6 py-4 relative">
        {/* Kiri: Sidebar toggle & judul halaman */}
        <div className="flex items-center space-x-4">
          <button onClick={toggleSidebar} className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`} aria-label="Toggle Sidebar">
            <Menu className={`${darkMode ? 'text-slate-300' : 'text-gray-600'} h-5 w-5`} />
          </button>
          <h1 className={`text-xl font-semibold ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>{pageTitle}</h1>
        </div>

        {/* Kanan: Theme toggle & profil */}
        <div className="flex items-center gap-x-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className={`p-2.5 rounded-lg transition-all duration-200 group ${darkMode ? 'hover:bg-slate-700 bg-slate-700/50' : 'hover:bg-gray-100 bg-gray-50'}`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors duration-200" /> : <Moon className="w-5 h-5 text-slate-600 group-hover:text-slate-700 transition-colors duration-200" />}
          </button>

          {/* Profile Button */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfilOpen(!profilOpen)}
              className={`p-2.5 rounded-lg transition-all duration-200 group relative ${darkMode ? 'hover:bg-slate-700 bg-slate-700/50' : 'hover:bg-gray-100 bg-gray-50'}`}
              title="Profile Menu"
            >
              <User className={`h-5 w-5 ${darkMode ? 'text-slate-300 group-hover:text-slate-100' : 'text-gray-600 group-hover:text-gray-700'} transition-colors duration-200`} />
              {profilOpen && <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${darkMode ? 'bg-emerald-400' : 'bg-emerald-500'} animate-pulse`}></div>}
            </button>

            {/* Dropdown Menu */}
            {profilOpen && (
              <div
                className={`absolute right-0 mt-3 w-64 shadow-2xl rounded-2xl py-4 px-2 z-50 border backdrop-blur-sm transition-all duration-200 transform origin-top-right ${
                  darkMode ? 'bg-slate-900/95 border-slate-700 shadow-slate-900/50' : 'bg-white/95 border-gray-200 shadow-gray-900/10'
                }`}
              >
                {/* User Info Header */}
                <div className="px-4 py-3 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
                      <User className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${darkMode ? 'text-slate-100' : 'text-gray-900'} truncate`}>Halo, {userName}!</p>
                      <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'} truncate`}>{email}</p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className={`h-px mx-4 mb-3 ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`}></div>

                {/* Menu Items */}
                <div className="px-2 space-y-1 mb-3">
                  <button
                    className={`w-full flex items-center text-sm px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                      darkMode ? 'text-slate-300 hover:bg-slate-800 hover:text-slate-100' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                    onClick={() => {
                      navigate('/dashboard/profil');
                      setProfilOpen(false);
                    }}
                  >
                    <User className={`w-4 h-4 mr-3 ${darkMode ? 'text-slate-400 group-hover:text-slate-300' : 'text-gray-500 group-hover:text-gray-600'} transition-colors duration-200`} />
                    <span>Profil Saya</span>
                  </button>

                  <button
                    className={`w-full flex items-center text-sm px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                      darkMode ? 'text-slate-300 hover:bg-slate-800 hover:text-slate-100' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                    onClick={() => {
                      toast.info('Fitur pengaturan akan segera tersedia', {
                        position: 'top-right',
                        theme: darkMode ? 'dark' : 'light',
                      });
                      setProfilOpen(false);
                    }}
                  >
                    <Settings className={`w-4 h-4 mr-3 ${darkMode ? 'text-slate-400 group-hover:text-slate-300' : 'text-gray-500 group-hover:text-gray-600'} transition-colors duration-200`} />
                    <span>Pengaturan</span>
                  </button>
                </div>

                {/* Divider */}
                <div className={`h-px mx-4 mb-3 ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`}></div>

                {/* Logout Button */}
                <div className="px-2">
                  <button
                    onClick={() => {
                      handleLogout();
                      setProfilOpen(false);
                    }}
                    className={`w-full flex items-center text-sm px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                      darkMode ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300' : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                    }`}
                  >
                    <LogOut className={`w-4 h-4 mr-3 ${darkMode ? 'text-red-400 group-hover:text-red-300' : 'text-red-500 group-hover:text-red-600'} transition-colors duration-200`} />
                    <span>Keluar</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
