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
        toast.success(result.message, {
          theme: darkMode ? 'dark' : 'light',
        }); // Tampilkan pesan sukses
        localStorage.removeItem('user'); // Hapus data user dari localStorage
        navigate('/'); // Redirect ke halaman utama
      } else {
        toast.error(result.message, {
          theme: darkMode ? 'dark' : 'light',
        }); // Tampilkan pesan error jika gagal
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Terjadi kesalahan saat logout', {
        theme: darkMode ? 'dark' : 'light',
      });
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
      {/* Overlay untuk mobile dengan backdrop blur */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeSidebar} />

      {/* Sidebar utama */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-64 shadow-2xl transform transition-all duration-300 ease-in-out ${darkMode ? 'bg-slate-900 shadow-slate-900/50' : 'bg-white shadow-gray-900/10'} ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        id="sidebar"
      >
        {/* Header sidebar: logo dan judul */}
        <div className={`flex items-center justify-between p-6 border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'} relative`}>
          <div className="flex items-center space-x-3">
            {/* Logo container dengan subtle glow effect */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center relative ${darkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
              <img src={icon} alt="Logo Karangpucung" className="w-10 h-10 object-contain" />
              {/* Subtle glow for dark mode */}
              {darkMode && <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10"></div>}
            </div>
            <div>
              <h2 className={`font-bold text-lg ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>Karangpucung</h2>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Portal Desa</p>
            </div>
          </div>

          {/* Tombol close sidebar (hanya muncul di mobile) */}
          <button
            onClick={closeSidebar}
            className={`lg:hidden p-2 rounded-lg transition-all duration-200 ${darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-slate-200' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'}`}
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Daftar menu navigasi */}
        <nav className="mt-6 px-3">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavigation(item.key)} // Navigasi ke section terkait
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group relative ${
                  currentSection === item.key
                    ? darkMode
                      ? 'bg-emerald-500/20 text-emerald-300 shadow-lg shadow-emerald-500/10'
                      : 'bg-emerald-50 text-emerald-600 shadow-sm'
                    : darkMode
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {/* Active indicator */}
                {currentSection === item.key && <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full ${darkMode ? 'bg-emerald-400' : 'bg-emerald-600'}`}></div>}

                {/* Ikon menu dengan background container */}
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
                    currentSection === item.key
                      ? darkMode
                        ? 'bg-emerald-400/20 text-emerald-300'
                        : 'bg-emerald-100 text-emerald-600'
                      : darkMode
                      ? 'text-slate-400 group-hover:text-slate-200 group-hover:bg-slate-700/50'
                      : 'text-gray-500 group-hover:text-gray-700 group-hover:bg-gray-100'
                  }`}
                >
                  {getIconComponent(item.icon)}
                </div>

                {/* Label menu */}
                <span className="font-medium flex-1">{item.label}</span>

                {/* Subtle arrow untuk active state */}
                {currentSection === item.key && <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-emerald-400' : 'bg-emerald-600'}`}></div>}
              </button>
            ))}
          </div>
        </nav>

        {/* Divider */}
        <div className={`mx-6 my-6 h-px ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`}></div>

        {/* Tombol logout di bagian bawah sidebar */}
        <div className="absolute bottom-6 left-3 right-3">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
              darkMode ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300' : 'text-red-600 hover:bg-red-50 hover:text-red-700'
            }`}
          >
            {/* Subtle background effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${darkMode ? 'bg-red-500/5' : 'bg-red-50'}`}></div>

            {/* Icon dengan background container */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 relative z-10 ${
                darkMode ? 'text-red-400 group-hover:bg-red-500/20 group-hover:text-red-300' : 'text-red-500 group-hover:bg-red-100 group-hover:text-red-600'
              }`}
            >
              <LogOut size={18} />
            </div>

            <span className="font-medium relative z-10">Keluar</span>
          </button>
        </div>

        {/* Bottom gradient overlay untuk visual depth */}
        <div className={`absolute bottom-0 left-0 right-0 h-20 pointer-events-none ${darkMode ? 'bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent' : 'bg-gradient-to-t from-white via-white/80 to-transparent'}`}></div>
      </div>
    </>
  );
}
