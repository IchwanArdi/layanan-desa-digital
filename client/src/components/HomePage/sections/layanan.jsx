import { useState, useEffect } from 'react';
import { FilePlus, MessageCircleWarning, SearchCheck, ThumbsUp, ArrowRight, Clock, Users, Star } from 'lucide-react';
import { Element } from 'react-scroll';

// Placeholder untuk gambar - menggunakan gradients
import layananDocumentasi from '../../../assets/layanan-dokumentasi.webp';
import layananPengaduan from '../../../assets/layanan-pengaduan.webp';

const layananList = [
  {
    title: 'Ajukan Data',
    description: 'Ajukan permohonan surat keterangan, dokumen kependudukan, dan lainnya dengan mudah.',
    icon: <FilePlus size={32} className="text-green-600" />,
    link: '/desa-digital/ajukan-data',
    stats: '2,341 pengajuan',
    time: '2-3 hari kerja',
  },
  {
    title: 'Pengaduan Warga',
    description: 'Laporkan masalah lingkungan, pelayanan, atau aduan warga lainnya secara online.',
    icon: <MessageCircleWarning size={32} className="text-red-500" />,
    link: '/desa-digital/pengaduan-warga',
    stats: '856 pengaduan',
    time: '24 jam respon',
  },
  {
    title: 'Lacak Pengajuan',
    description: 'Cek status permohonan Anda kapan saja dan di mana saja dengan fitur pelacakan otomatis.',
    icon: <SearchCheck size={32} className="text-blue-500" />,
    link: '/desa-digital/lacak-pengajuan',
    stats: '98% akurasi',
    time: 'Real-time',
  },
  {
    title: 'Survei Kepuasan',
    description: 'Berikan pendapat dan nilai terhadap layanan yang telah Anda gunakan.',
    icon: <ThumbsUp size={32} className="text-yellow-500" />,
    link: '/desa-digital/survei-kepuasan',
    stats: '4.8/5 rating',
    time: '5 menit',
  },
];

function Layanan() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Element name="layanan">
      <section className="bg-black py-15 min-h-screen" id="layanan">
        <div className="container mx-auto max-w-6xl px-6 md:px-10">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">Layanan Digital Desa</h1>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mb-5" />
            <p className="text-gray-200 text-lg max-w-2xl mx-auto">Gunakan fitur layanan berikut untuk mempermudah urusan Anda bersama Kelurahan Karangpucung.</p>
          </div>

          {/* Grid Section - Hero Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div
              className="border border-gray-700 p-6 rounded-2xl shadow-lg group hover:border-green-600 hover:border-2 transition-all duration-300 hover:bg-gray-900/50 transform hover:-translate-y-1"
              onMouseEnter={() => setHoveredCard('dokumentasi')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold text-green-600 group-hover:text-green-400 transition-colors">Layanan Dokumentasi</h2>
                <div className={`transition-transform duration-300 ${hoveredCard === 'dokumentasi' ? 'rotate-45' : ''}`}>
                  <ArrowRight className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-gray-300 my-5">Semua layanan tersedia dalam satu platform untuk kemudahan akses.</p>
              <div className="overflow-hidden rounded-lg">
                <img src={layananDocumentasi} alt="Tampilan layanan dokumentasi desa" loading="lazy" width="600" height="400" className="w-full h-auto object-cover transition-transform duration-300" />
              </div>
            </div>

            <div
              className="border border-gray-700 p-6 rounded-2xl shadow-lg group hover:border-green-600 hover:border-2 transition-all duration-300 hover:bg-gray-900/50 transform hover:-translate-y-1"
              onMouseEnter={() => setHoveredCard('pengaduan')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold text-green-600 group-hover:text-green-400 transition-colors">Layanan Pengaduan</h2>
                <div className={`transition-transform duration-300 ${hoveredCard === 'pengaduan' ? 'rotate-45' : ''}`}>
                  <ArrowRight className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-gray-300 my-5">Dapat diakses kapan saja dan di mana saja melalui perangkat Anda.</p>
              <div className="overflow-hidden rounded-lg">
                <img src={layananPengaduan} alt="Formulir pengaduan warga desa" loading="lazy" width="600" height="400" className="w-full h-auto object-cover transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Grid Section Unggulan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {layananList.map((layanan, index) => (
              <a
                href={layanan.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="bg-black border border-gray-700 rounded-2xl transition-all duration-300 p-6 flex flex-col items-start gap-3 group hover:border-green-600 hover:shadow-xl hover:shadow-green-600/20 transform hover:-translate-y-2 hover:bg-gray-900/50"
                onMouseEnter={() => setHoveredCard(`layanan-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="p-3 transition-all duration-300 border-gray-700 group-hover:border-green-600">{layanan.icon}</div>

                <h3 className="text-xl font-semibold text-green-600 group-hover:text-green-400 transition-colors">{layanan.title}</h3>

                <p className="text-gray-200 text-sm leading-relaxed flex-grow">{layanan.description}</p>

                {/* Stats Section */}
                <div className="w-full space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Users className="w-3 h-3" />
                    <span className={`transition-all duration-500 ${animateStats ? 'opacity-100' : 'opacity-0'}`}>{layanan.stats}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{layanan.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full mt-auto">
                  <span className="text-sm text-green-600 group-hover:text-green-400 font-medium transition-colors">Lihat Selengkapnya</span>
                  <div className={`transition-transform duration-300 ${hoveredCard === `layanan-${index}` ? 'translate-x-2' : ''}`}>
                    <ArrowRight className="w-4 h-4 text-green-600 group-hover:text-green-400" />
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/0 via-green-600/5 to-green-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </Element>
  );
}

export default Layanan;
