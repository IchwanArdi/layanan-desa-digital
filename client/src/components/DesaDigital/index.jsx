import usePageMeta from '../../Utils/usePageMeta';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Deskripsi from './sections/Deskripsi';

function IndexDesaDigital() {
  // untuk mengatur title dan meta description halaman
  usePageMeta('Desa Digital - Transformasi Pelayanan Publik', 'Layanan digital desa untuk kemudahan akses informasi dan administrasi warga.');

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-green-500/5 to-transparent rounded-full"></div>
        </div>

        <Deskripsi />
      </section>
    </>
  );
}

export default IndexDesaDigital;
