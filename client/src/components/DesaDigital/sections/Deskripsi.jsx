import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Info, FilePlus, MessageCircleWarning, SearchCheck, ThumbsUp, MapPin, Phone, Mail } from 'lucide-react';
import icon from '../../../assets/icon.png';

function Deskripsi() {
  const location = useLocation();

  const getSectionFromPath = (pathname) => {
    if (pathname.includes('/ajukan-data')) return 'visiMisi';
    if (pathname.includes('/pengaduan-warga')) return 'perangkat';
    if (pathname.includes('/lacak-pengajuan')) return 'sejarah';
    if (pathname.includes('/survei-kepuasan')) return 'fiturGrid';
    return 'profil';
  };

  const [currentSection, setCurrentSection] = useState(getSectionFromPath(location.pathname));

  useEffect(() => {
    setCurrentSection(getSectionFromPath(location.pathname));
  }, [location.pathname]);

  const handleNavigation = (sectionKey) => {
    setCurrentSection(sectionKey);
  };

  const sections = {
    profil: {
      title: 'Profil Desa Digital',
      type: 'content',
      content: `Selamat datang di platform Desa Digital, sebuah inovasi teknologi yang dirancang khusus untuk memudahkan kehidupan masyarakat desa dalam mengakses berbagai layanan administratif dan informasi penting.

Platform ini merupakan wujud komitmen pemerintah desa dalam memberikan pelayanan terbaik kepada warga dengan memanfaatkan teknologi digital. Melalui sistem yang terintegrasi, warga dapat mengakses berbagai layanan tanpa harus datang ke kantor desa secara langsung.

Visi Kami:
Menjadi platform digital terdepan yang menghubungkan pemerintah desa dengan masyarakat melalui layanan yang efisien, transparan, dan mudah diakses.

Misi Kami:
• Memberikan kemudahan akses layanan administratif bagi seluruh warga
• Meningkatkan transparansi dalam penyelenggaraan pemerintahan desa
• Mendorong partisipasi aktif masyarakat dalam pembangunan desa
• Menciptakan ekosistem digital yang berkelanjutan di tingkat desa

Layanan 24/7 tersedia untuk memastikan warga dapat mengakses informasi dan layanan kapan saja dibutuhkan.`,
    },
    visiMisi: {
      title: 'Ajukan Data & Dokumen',
      type: 'grid',
      items: [
        {
          icon: '📋',
          title: 'Surat Keterangan Domisili',
          description: 'Ajukan permohonan surat keterangan domisili secara online dengan persyaratan yang mudah dan proses yang cepat.',
        },
        {
          icon: '👥',
          title: 'Kartu Keluarga',
          description: 'Permohonan pembuatan atau perubahan data Kartu Keluarga dapat dilakukan melalui platform ini.',
        },
        {
          icon: '🆔',
          title: 'KTP & E-KTP',
          description: 'Layanan pembuatan KTP baru, perpanjangan, atau perubahan data KTP dengan sistem antrian online.',
        },
        {
          icon: '👶',
          title: 'Akta Kelahiran',
          description: 'Proses pengajuan akta kelahiran untuk bayi baru lahir dengan dokumentasi digital.',
        },
        {
          icon: '💼',
          title: 'Surat Keterangan Usaha',
          description: 'Untuk para pelaku UMKM yang membutuhkan surat keterangan usaha sebagai syarat kredit atau legalitas.',
        },
        {
          icon: '🏠',
          title: 'Surat Keterangan Tidak Mampu',
          description: 'Ajukan SKTM untuk berbagai keperluan seperti beasiswa, bantuan sosial, atau keringanan biaya.',
        },
      ],
    },
    perangkat: {
      title: 'Pengaduan Warga',
      type: 'content',
      content: `Sistem Pengaduan Warga merupakan saluran komunikasi langsung antara masyarakat dengan pemerintah desa untuk menyampaikan keluhan, kritik, saran, dan aspirasi.

Jenis Pengaduan yang Dapat Disampaikan:

🏗️ Infrastruktur Desa
• Jalan rusak atau berlubang
• Fasilitas umum yang perlu perbaikan
• Masalah drainase dan saluran air
• Penerangan jalan umum

🌱 Lingkungan Hidup
• Pencemaran lingkungan
• Pengelolaan sampah
• Kerusakan lingkungan
• Masalah kebersihan area publik

👥 Pelayanan Publik
• Keluhan terhadap pelayanan aparatur
• Keterlambatan pengurusan dokumen
• Prosedur yang rumit atau tidak jelas
• Diskriminasi dalam pelayanan

💰 Keuangan & Bantuan
• Transparansi penggunaan dana desa
• Penyaluran bantuan sosial
• Program pemberdayaan masyarakat

Cara Menyampaikan Pengaduan:
1. Isi formulir pengaduan online dengan lengkap
2. Lampirkan bukti pendukung (foto/dokumen)
3. Dapatkan nomor tiket pengaduan
4. Pantau progress penanganan secara real-time
5. Berikan feedback setelah pengaduan ditangani

Komitmen Kami:
• Respon awal dalam 1x24 jam
• Penanganan maksimal 7 hari kerja
• Transparansi proses penanganan
• Feedback berkala kepada pelapor`,
    },
    sejarah: {
      title: 'Lacak Status Pengajuan',
      type: 'grid',
      items: [
        {
          icon: '📝',
          title: 'Status Dokumen',
          description: 'Pantau progress pengajuan dokumen Anda mulai dari verifikasi hingga selesai. Notifikasi real-time untuk setiap update status.',
        },
        {
          icon: '🔍',
          title: 'Riwayat Pengajuan',
          description: 'Lihat semua riwayat pengajuan dokumen yang pernah Anda buat beserta status dan tanggal penyelesaiannya.',
        },
        {
          icon: '📅',
          title: 'Jadwal Pengambilan',
          description: 'Sistem akan memberitahu jadwal optimal untuk pengambilan dokumen yang sudah selesai diproses.',
        },
        {
          icon: '⏰',
          title: 'Estimasi Waktu',
          description: 'Dapatkan estimasi waktu penyelesaian yang akurat berdasarkan jenis dokumen dan antrian saat ini.',
        },
        {
          icon: '📧',
          title: 'Notifikasi Email/SMS',
          description: 'Terima notifikasi otomatis via email atau SMS untuk setiap perubahan status pengajuan Anda.',
        },
        {
          icon: '💬',
          title: 'Chat dengan Petugas',
          description: 'Fitur chat langsung dengan petugas untuk menanyakan detail atau kendala dalam proses pengajuan.',
        },
      ],
    },
    fiturGrid: {
      title: 'Survei Kepuasan Masyarakat',
      type: 'content',
      content: `Survei Kepuasan Masyarakat adalah instrumen penting untuk mengukur kualitas pelayanan dan tingkat kepuasan warga terhadap berbagai layanan yang diberikan oleh pemerintah desa.

📊 Indikator Penilaian:

Kualitas Pelayanan (25%)
• Kecepatan pelayanan
• Keramahan petugas
• Kemudahan prosedur
• Ketepatan informasi

Fasilitas & Infrastruktur (25%)
• Kondisi kantor desa
• Fasilitas penunjang
• Aksesibilitas lokasi
• Kebersihan lingkungan

Transparansi & Akuntabilitas (25%)
• Keterbukaan informasi
• Proses yang jelas
• Biaya yang transparan
• Mekanisme pengaduan

Inovasi & Digitalisasi (25%)
• Kemudahan akses online
• Fitur aplikasi yang user-friendly
• Integrasi sistem digital
• Responsivitas platform

🎯 Manfaat Survei:
• Evaluasi kinerja pelayanan secara berkala
• Identifikasi area yang perlu perbaikan
• Peningkatan kualitas layanan berkelanjutan
• Dasar pengambilan kebijakan yang tepat

📈 Hasil Survei:
Hasil survei dipublikasikan secara berkala dan dapat diakses oleh seluruh warga sebagai bentuk transparansi. Data ini juga menjadi acuan untuk program perbaikan dan inovasi layanan.

Partisipasi Anda dalam survei ini sangat berharga untuk kemajuan pelayanan desa. Setiap feedback yang diberikan akan ditindaklanjuti untuk menciptakan pelayanan yang lebih baik.`,
    },
  };

  const navItems = [
    { key: 'profil', icon: <Info size={20} />, label: 'Profil' },
    { key: 'visiMisi', icon: <FilePlus size={20} />, label: 'Ajukan Data' },
    { key: 'perangkat', icon: <MessageCircleWarning size={20} />, label: 'Pengaduan Warga' },
    { key: 'sejarah', icon: <SearchCheck size={20} />, label: 'Lacak Pengajuan' },
    { key: 'fiturGrid', icon: <ThumbsUp size={20} />, label: 'Survei Kepuasan' },
  ];

  return (
    <div className="min-h-screen ">
      <section className="p-3 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Header */}
          <div className="lg:hidden mb-6 ">
            <div className="flex items-center gap-3 mb-4 p-4">
              <img src={icon} alt="Desa Digital" className="w-12 h-12" />
              <div>
                <h1 className="text-xl font-bold text-green-400">Desa Digital</h1>
                <p className="text-gray-400 text-sm">Platform Layanan Terpadu</p>
              </div>
            </div>

            {/* Fixed Mobile Navigation with better touch handling */}
            <div className="relative">
              <div
                className="flex gap-3 pb-3 overflow-x-auto touch-pan-x "
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleNavigation(item.key)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 touch-manipulation select-none  ${
                      currentSection === item.key
                        ? 'bg-green-800 text-white shadow-lg shadow-green-600/25 border border-green-500'
                        : 'bg-gray-800/60 backdrop-blur-sm text-gray-300 hover:bg-green-600/20 hover:text-green-300 border border-gray-700/50 '
                    }`}
                    style={{
                      minWidth: 'fit-content',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className="whitespace-nowrap font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Scroll indicators */}
              <div className="absolute top-0 right-0 bottom-3 w-8 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none lg:hidden"></div>
              <div className="absolute top-0 left-0 bottom-3 w-4 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none lg:hidden"></div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block lg:w-80 xl:w-96">
              <div className="sticky top-6 p-6 border border-gray-700/50 rounded-2xl shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <img src={icon} alt="Desa Digital" className="w-16 h-16 rounded-full" />
                  <div>
                    <h1 className="text-2xl font-bold text-green-400">Desa Digital</h1>
                    <p className="text-gray-400">Platform Layanan Terpadu</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => handleNavigation(item.key)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left group ${
                        currentSection === item.key ? 'bg-green-700 text-white shadow-lg transform scale-[1.02]' : 'text-gray-300 hover:bg-green-600/20 hover:text-green-300 hover:transform hover:scale-[1.01] cursor-pointer'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${currentSection === item.key ? 'bg-white/20' : 'bg-gray-700 group-hover:bg-green-600/30'}`}>{item.icon}</div>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Contact Info */}
                <div className="mt-8 p-4 rounded-xl border border-gray-600/50">
                  <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                    <Phone size={16} />
                    Kontak Kami
                  </h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>Jl. Desa Digital No. 123</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} />
                      <span>(0281) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} />
                      <span>info@desadigital.id</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:min-h-[80vh]">
              <div className="border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-green-600 rounded-lg border border-green-600/30">{navItems.find((item) => item.key === currentSection)?.icon}</div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600">{sections[currentSection].title}</h2>
                  </div>

                  <div className="animate-fadeIn">
                    {sections[currentSection].type === 'grid' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {sections[currentSection].items.map((item, index) => (
                          <div
                            key={index}
                            className="group bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl cursor-pointer"
                          >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                            <h4 className="text-xl font-semibold text-green-300 mb-3 group-hover:text-green-400 transition-colors">{item.title}</h4>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="prose prose-invert max-w-none">
                        <div className="text-gray-200 whitespace-pre-line text-base lg:text-lg leading-relaxed">{sections[currentSection].content}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        <style jsx>{`
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Hide scrollbar but allow scrolling */
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }

          /* Ensure smooth scrolling on mobile */
          .touch-pan-x {
            scroll-behavior: smooth;
          }
        `}</style>
      </section>
    </div>
  );
}

export default Deskripsi;
