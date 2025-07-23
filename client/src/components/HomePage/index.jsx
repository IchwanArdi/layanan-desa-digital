import Beranda from './beranda';
import Layanan from './layanan';
import Navbar from './navbar';
import Tentang from './tentang';
import Contact from './contact';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Index() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Komponen pemisah garis tengah
  const SectionDivider = ({ label }) => (
    <div className="flex items-center justify-center my-4 md:my-10 px-4">
      <div className="w-full max-w-6xl relative">
        <div className="border-t border-gray-700 w-full"></div>
        <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-black px-3 text-green-400 text-xs md:text-sm tracking-widest uppercase">{label}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-black text-white">
      <Navbar />
      <Beranda />

      <SectionDivider label="Tentang Desa Kami" />
      <Tentang />

      <SectionDivider label="Layanan Warga" />
      <Layanan />

      <SectionDivider label="Contact" />
      <Contact />
    </div>
  );
}

export default Index;
