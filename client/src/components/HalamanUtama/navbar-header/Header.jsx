// components/Layout/Header.jsx
import { LogOut, Menu, User, Moon, Settings } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Header({ toggleSidebar, userName, email }) {
  const navigate = useNavigate(); // untuk navigasi ke halaman lain
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
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30 lg:ml-64">
      <div className="flex items-center justify-between px-6 py-4 relative">
        {/* Kiri: Sidebar toggle & judul halaman */}
        <div className="flex items-center space-x-4">
          <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition" aria-label="Toggle Sidebar">
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
        </div>

        {/* Kanan: Theme toggle & profil */}
        <div className="flex items-center gap-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" aria-label="Toggle Dark Mode">
            <Moon className="w-5 h-5 text-gray-600" />
          </button>

          {/* Profil Button */}
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setProfilOpen(!profilOpen)} className="p-2 rounded-lg hover:bg-gray-200 transition cursor-pointer" aria-label="User Menu">
              <User className="h-5 w-5 text-gray-700" />
            </button>

            {/* Dropdown */}
            {profilOpen && (
              <div className="absolute right-0 mt-2 w-52 top-13 bg-white shadow-xl rounded-2xl py-4 px-5 z-50 border border-gray-100">
                {/* Bagian Header */}
                <div className="mb-3 mx-2">
                  <p className="text-md text-gray-900 font-semibold">Halo, {userName}!</p>
                  <p className="text-xs text-gray-500 truncate">{email}</p>
                </div>
                <hr className="border-gray-200 mb-3" />

                {/* Menu Item */}
                <div className="flex flex-col space-y-2 mb-3">
                  <button
                    className="flex items-center text-sm text-gray-700 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition"
                    onClick={() => {
                      navigate('/dashboard/profil');
                      setProfilOpen(false);
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profil Saya
                  </button>

                  <button
                    className="flex items-center text-sm text-gray-700 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition"
                    onClick={() => {
                      toast.info('Fitur pengaturan akan segera tersedia');
                    }}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Pengaturan
                  </button>
                </div>

                <hr className="border-gray-200 mb-3" />

                {/* Tombol Logout */}
                <button onClick={handleLogout} className="flex items-center text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1.5 rounded-lg transition w-full">
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
