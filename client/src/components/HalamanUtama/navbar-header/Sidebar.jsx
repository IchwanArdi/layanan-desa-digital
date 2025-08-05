// Import gambar logo, data navigasi, ikon, dan beberapa hook/utilitas
import icon from '../../../assets/icon.png';
import { navItems } from './data';
import { Home, FileText, MessageSquare, User, LogOut, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSettings } from '../../../contexts/SettingsContext';

export default function Sidebar({ isSidebarOpen, closeSidebar, handleNavigation, currentSection }) {
  const navigate = useNavigate();
  const { darkMode } = useSettings();

  // Fungsi untuk logout user
  const handleLogout = async () => {
    try {
      // Panggil endpoint logout di backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message); // Tampilkan pesan sukses
        localStorage.removeItem('user'); // Hapus data user dari localStorage
        navigate('/'); // Redirect ke halaman utama
      } else {
        toast.error(result.message); // Tampilkan pesan error jika gagal
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Terjadi kesalahan saat logout');
    }
  };

  // Fungsi untuk mengambil ikon sesuai nama yang diberikan pada navItems
  const getIconComponent = (iconName) => {
    const icons = {
      Home: <Home size={20} />,
      FileText: <FileText size={20} />,
      MessageSquare: <MessageSquare size={20} />,
      User: <User size={20} />,
    };
    return icons[iconName];
  };

  return (
    <>
      {/* Overlay hitam transparan untuk menutup sidebar saat klik di luar sidebar (khusus mobile) */}
      <div className={`${darkMode ? 'fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300' : ''} ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeSidebar} />

      {/* Sidebar utama */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-64 ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        id="sidebar"
      >
        {/* Header sidebar: logo dan judul */}
        <div className={`flex items-center justify-between p-6 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <div className="w-13 h-13 rounded-full flex items-center justify-center">
              <img src={icon} alt="Logo" />
            </div>
            <div>
              <h2 className={`${darkMode ? 'text-gray-100' : 'text-gray-800'} font-bold`}>Karangpucung</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Portal Desa</p>
            </div>
          </div>
          {/* Tombol close sidebar (hanya muncul di mobile) */}
          <button onClick={closeSidebar} className={`lg:hidden p-1 rounded-lg transition-colors duration-200 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`} aria-label="Close Sidebar">
            <X size={20} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
          </button>
        </div>

        {/* Daftar menu navigasi */}
        <nav className="mt-6">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavigation(item.key)} // Navigasi ke section terkait
              className={`w-full flex items-center space-x-3 px-6 py-4 transition-all duration-200 text-left group ${
                currentSection === item.key
                  ? darkMode
                    ? 'bg-green-900 text-green-400 border-r-4 border-green-400'
                    : 'bg-green-100 text-green-600 border-r-4 border-green-600'
                  : darkMode
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-gray-100 cursor-pointer'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 cursor-pointer'
              }`}
            >
              {/* Ikon menu */}
              <div
                className={`transition-colors duration-200 ${
                  currentSection === item.key ? (darkMode ? 'text-green-400' : 'text-green-600') : darkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-500 group-hover:text-gray-700'
                }`}
              >
                {getIconComponent(item.icon)}
              </div>
              {/* Label menu */}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Tombol logout di bagian bawah sidebar */}
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group cursor-pointer ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <LogOut className={`h-5 w-5 transition-colors duration-200 ${darkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-500 group-hover:text-gray-700'}`} />
            <span className={`group-hover:transition-colors duration-200 ${darkMode ? 'group-hover:text-gray-100' : 'group-hover:text-gray-900'}`}>Keluar</span>
          </button>
        </div>
      </div>
    </>
  );
}
