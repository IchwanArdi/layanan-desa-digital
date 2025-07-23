import React, { useState, useEffect } from 'react';
import logo from '../../assets/icon.png';
import '../../style/navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (e) => {
      if (!e.target.closest('#hamburger') && !e.target.closest('#navLink')) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header id="header" style={{ backgroundColor: 'rgb(0,0,0)' }} className={`sticky top-0 z-40 transition-all duration-300  ${scrolled ? 'backdrop-blur-md' : ''}`}>
      <div id="header-container" className={`container mx-auto flex items-center justify-between max-w-6xl px-5 py-3 shadow-lg rounded-2xl transition-all duration-300 ${scrolled ? 'bg-dark-800' : ''}`}>
        <a href="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 md:h-16" />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-4">
          <a href="/" className="px-4 py-2 text-gray-200 font-medium hover:text-green-500 transition-colors">
            Beranda
          </a>
          <a href="/tentang" className="px-4 py-2 text-gray-200 font-medium hover:text-green-500 transition-colors">
            Tentang
          </a>
          <a href="/layanan" className="px-4 py-2 text-gray-200 font-medium hover:text-green-500 transition-colors">
            Layanan
          </a>
          <a href="/ajukan" className="px-4 py-2 text-gray-200 font-medium hover:text-green-500 transition-colors">
            Ajukan
          </a>
          <a href="/login" className="px-6 py-1 text-gray-200 font-semibold shadow-2xl bg-green-700 hover:bg-green-800 transition-all duration-300 rounded-2xl">
            Login
          </a>
        </nav>

        {/* Hamburger */}
        <button id="hamburger" onClick={() => setMenuOpen(!menuOpen)} className={`flex flex-col items-center justify-center space-y-2 cursor-pointer z-50 outline-0 md:hidden ${menuOpen ? 'hamburger-active' : ''}`}>
          <span className="hamburger-line bg-gray-200"></span>
          <span className="hamburger-line bg-gray-200"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div id="navLink" className={`flex flex-col items-center space-y-3 px-6 py-4 mt-2 rounded-xl w-[200px] glass-effect md:hidden transition-all duration-300 absolute right-5 top-[80px] z-50 ${menuOpen ? 'active' : 'hidden'}`}>
        <a href="/" className="w-full text-center px-4 py-2 text-black font-medium hover:text-blue-500 transition-colors">
          Beranda
        </a>
        <a href="/tentang" className="w-full text-center px-4 py-2 text-black font-medium hover:text-blue-500 transition-colors">
          Tentang
        </a>
        <a href="/layanan" className="w-full text-center px-4 py-2 text-black font-medium hover:text-blue-500 transition-colors">
          Layanan
        </a>
        <a href="/ajukan" className="w-full text-center px-4 py-2 rounded-full text-white bg-black font-medium btn-hover transition-all">
          Kontak
        </a>
      </div>
    </header>
  );
}

export default Navbar;
