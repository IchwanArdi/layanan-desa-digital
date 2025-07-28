// Tentang.js - Main Component

import { useState } from 'react';
import { Menu, Info, Users, BookOpen, Star, ChevronRight } from 'lucide-react';
import { Element } from 'react-scroll';

// Import data dan functions dari file terpisah
import { sections, navItems } from './data.js';
import { formatContent, renderContentItem } from './utils.jsx';

function Tentang() {
  // State untuk mengontrol section aktif dan mobile menu
  const [currentSection, setCurrentSection] = useState('profil');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function untuk mengubah section
  const handleSectionChange = (sectionKey) => {
    setCurrentSection(sectionKey);
    setIsMobileMenuOpen(false);
  };

  // Function untuk mendapatkan icon component berdasarkan nama
  const getIconComponent = (iconName) => {
    const icons = {
      Info: <Info size={18} />,
      BookOpen: <BookOpen size={18} />,
      Users: <Users size={18} />,
      Menu: <Menu size={18} />,
      Star: <Star size={18} />,
    };
    return icons[iconName];
  };

  return (
    <Element name="tentang">
      <section className="bg-black py-15 min-h-screen" id="tentang">
        <div className="container mx-auto max-w-6xl px-6 md:px-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">Tentang Karangpucung</h1>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full" />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full flex items-center justify-between p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white hover:bg-slate-700/50 transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  {getIconComponent(navItems.find((item) => item.key === currentSection)?.icon)}
                  {navItems.find((item) => item.key === currentSection)?.label}
                </span>
                <ChevronRight className={`transform transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} size={20} />
              </button>
            </div>

            {/* Sidebar Navigation */}
            <aside className={`lg:w-80 w-full ${isMobileMenuOpen ? 'block ' : 'hidden lg:block'}`}>
              <div className="sticky top-25 border border-slate-700 rounded-2xl p-6 shadow-2xl">
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => handleSectionChange(item.key)}
                      className={`w-full group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left ${
                        currentSection === item.key
                          ? 'bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 text-green-300 shadow-lg'
                          : 'text-slate-300 hover:bg-slate-700/40 hover:text-white hover:border-slate-600/50 border border-transparent cursor-pointer'
                      }`}
                    >
                      <div className={`p-2 rounded-lg transition-all duration-300 ${currentSection === item.key ? 'bg-green-500/20 text-green-300' : 'bg-slate-700/50 text-slate-400 group-hover:bg-slate-600/50 group-hover:text-slate-300'}`}>
                        {getIconComponent(item.icon)}
                      </div>
                      <span className="font-medium">{item.label}</span>
                      {currentSection === item.key && <div className="ml-auto w-2 h-2 bg-green-400 rounded-full" />}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-h-[600px]">
              <div key={currentSection} className="backdrop-blur-sm border border-slate-700 rounded-2xl p-8 lg:p-12 shadow-2xl transform transition-all duration-500 hover:shadow-3xl">
                {/* Section Header */}
                <div className="mb-8">
                  <h2 className="text-3xl lg:text-4xl font-bold text-green-600 mb-4">{sections[currentSection].title}</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full" />
                </div>

                {/* Content */}
                {sections[currentSection].type === 'grid' ? (
                  // Grid Layout untuk Program Unggulan
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sections[currentSection].items.map((item, index) => (
                      <div
                        key={index}
                        className="group bg-slate-700/30 backdrop-blur-sm border border-slate-600/30 p-6 rounded-xl hover:bg-slate-600/40 hover:border-green-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1"
                      >
                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                        <h4 className="text-xl font-semibold text-green-400 mb-3 transition-colors duration-300">{item.title}</h4>
                        <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">{item.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Text Content dengan Formatting
                  <div className="prose prose-lg max-w-none">
                    <div className="space-y-6">{formatContent(sections[currentSection].content).map((item, index) => renderContentItem(item, index))}</div>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </section>
    </Element>
  );
}

export default Tentang;
