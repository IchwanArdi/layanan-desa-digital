// components/Layout/Sidebar.jsx
import logo from '../../../assets/logo.png';
import { Home, FileText, MessageSquare, User, LogOut, X } from 'lucide-react';
import { navItems } from './data';

export default function Sidebar({ isSidebarOpen, closeSidebar, handleNavigation, currentSection }) {
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
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeSidebar} />

      <div className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`} id="sidebar">
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
          <button onClick={closeSidebar} className="lg:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200" aria-label="Close Sidebar">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

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
