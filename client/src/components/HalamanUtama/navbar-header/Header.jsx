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
    <header className={` ${darkMode ? 'bg-gray-900 text-white' : 'bg-white/20 text-gray-800'} shadow-sm border-b border-gray-200 sticky top-0 z-30 lg:ml-64`}>
      <div className="flex items-center justify-between px-6 py-4 relative">
        {/* Kiri: Sidebar toggle & judul halaman */}
        <div className="flex items-center space-x-4">
          <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition" aria-label="Toggle Sidebar">
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          {darkMode ? <h1 className="text-xl font-semibold text-gray-100">{pageTitle}</h1> : <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>}
        </div>

        {/* Kanan: Theme toggle & profil */}
        <div className="flex items-center gap-x-4">
          <button onClick={toggleDarkMode} className={` ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100 '} p-2 rounded-lg transition-all duration-200 cursor-pointer`}>
            {darkMode ? <Sun className="w-5 h-5 text-gray-100" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>

          {/* Profil Button */}
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setProfilOpen(!profilOpen)} className={` ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100 '} p-2 rounded-lg transition-all duration-200 cursor-pointer`}>
              {darkMode ? <User className="h-5 w-5 text-gray-100" /> : <User className="h-5 w-5 text-gray-700" />}
            </button>

            {/* Dropdown */}
            {profilOpen && (
              <div className={`absolute right-0 mt-2 w-52 top-13 shadow-xl rounded-2xl py-4 px-5 z-50 border ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'}`}>
                {/* Bagian Header */}
                <div className="mb-3 mx-2">
                  <p className={`text-md font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Halo, {userName}!</p>
                  <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{email}</p>
                </div>
                <hr className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} mb-3`} />

                {/* Menu Item */}
                <div className="flex flex-col space-y-2 mb-3">
                  <button
                    className={`flex items-center text-sm px-2 py-1.5 rounded-lg transition ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => {
                      navigate('/dashboard/profil');
                      setProfilOpen(false);
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profil Saya
                  </button>

                  <button
                    className={`flex items-center text-sm px-2 py-1.5 rounded-lg transition ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => {
                      toast.info('Fitur pengaturan akan segera tersedia');
                    }}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Pengaturan
                  </button>
                </div>

                <hr className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} mb-3`} />

                {/* Tombol Logout */}
                <button onClick={handleLogout} className={`flex items-center text-sm hover:text-red-700 px-2 py-1.5 rounded-lg transition w-full ${darkMode ? 'text-red-400 hover:bg-red-200' : 'text-red-600 hover:bg-red-50'}`}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
