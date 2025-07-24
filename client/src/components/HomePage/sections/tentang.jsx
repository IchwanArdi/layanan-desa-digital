import { useState } from 'react';
import { Menu, Info, Users, BookOpen, Star, ChevronRight } from 'lucide-react';
import { Element } from 'react-scroll';

const sections = {
  profil: {
    title: 'Profil Kelurahan',
    content: `Kelurahan Karangpucung adalah salah satu kelurahan yang terletak di Kecamatan Purwokerto Selatan, Kabupaten Banyumas, Jawa Tengah. Kelurahan ini memiliki luas wilayah sekitar 4,2 km² dengan jumlah penduduk kurang lebih 8.500 jiwa yang tersebar dalam 2.400 kepala keluarga.

Secara geografis, Karangpucung berbatasan dengan:
- Utara: Kelurahan Teluk
- Selatan: Kelurahan Kedungwuluh
- Timur: Kelurahan Purwokerto Wetan
- Barat: Kelurahan Bancarkembar

Kelurahan ini memiliki tanah pertanian yang subur dengan sistem irigasi yang baik, sehingga menyediakan banyak peluang bagi para petani untuk menanam padi, jagung, kacang tanah, ubi kayu, dan berbagai tanaman hortikultura lainnya. Mayoritas penduduknya bekerja sebagai petani (40%), pedagang (25%), PNS/ASN (15%), wirausaha (10%), dan sisanya bekerja di sektor jasa dan ada yang merantau ke luar daerah bahkan hingga luar negeri.

Kelurahan Karangpucung memiliki akses yang sangat strategis ke pusat kota Purwokerto, hanya berjarak 3 km dari alun-alun Purwokerto. Transportasi umum seperti angkutan kota dan ojek online mudah diakses, membuat mobilitas warga sangat lancar. Infrastruktur jalan dalam kondisi baik dengan penerangan jalan yang memadai di seluruh wilayah.`,
  },
  visiMisi: {
    title: 'Visi & Misi',
    content: `VISI:
"Terwujudnya Masyarakat Karangpucung yang Sejahtera, Mandiri, dan Berdaya Saing dalam Bingkai Tata Kelola Pemerintahan yang Baik"

MISI:
1) Meningkatkan kualitas pelayanan publik yang prima dan transparan
   - Mempercepat proses pelayanan administrasi kependudukan
   - Mengembangkan sistem pelayanan berbasis digital
   - Meningkatkan akuntabilitas dalam setiap program pembangunan

2) Mengembangkan potensi ekonomi masyarakat berbasis pertanian dan perdagangan
   - Memfasilitasi pembentukan kelompok tani dan koperasi
   - Mengembangkan sentra produksi pertanian organik
   - Membuka akses pasar yang lebih luas untuk produk lokal

3) Meningkatkan kualitas pendidikan dan kesehatan masyarakat
   - Menyediakan beasiswa untuk anak kurang mampu berprestasi
   - Mengoptimalkan program Posyandu dan Posbindu
   - Memfasilitasi kegiatan literasi dan pembelajaran sepanjang hayat

4) Memperkuat kelembagaan masyarakat dan partisipasi warga
   - Meningkatkan kapasitas RT/RW dan organisasi masyarakat
   - Mendorong partisipasi aktif dalam musyawarah pembangunan
   - Memperkuat kohesi sosial melalui gotong royong

5) Melestarikan budaya dan nilai-nilai luhur masyarakat Banyumas
   - Mengadakan festival budaya dan seni tradisional
   - Membina generasi muda dalam melestarikan bahasa Jawa
   - Mempertahankan tradisi dan kearifan lokal`,
  },
  perangkat: {
    title: 'Perangkat Kelurahan',
    content: `STRUKTUR ORGANISASI KELURAHAN KARANGPUCUNG

KEPALA KELURAHAN
Bapak Sumarno, S.Sos
Bertanggung jawab atas keseluruhan penyelenggaraan pemerintahan kelurahan, koordinasi dengan instansi terkait, dan pembinaan masyarakat.

SEKRETARIS KELURAHAN
Ibu Siti Aminah, S.AP
Membantu Lurah dalam administrasi pemerintahan, perencanaan program, dan koordinasi internal kelurahan.

KEPALA SEKSI PEMERINTAHAN
Bapak Ahmad Fauzi, S.H
Menangani administrasi kependudukan, surat menyurat, keamanan dan ketertiban, serta koordinasi dengan RT/RW.

KEPALA SEKSI KESEJAHTERAAN RAKYAT
Ibu Dr. Ratna Sari, S.Sos
Membidangi program kesehatan, pendidikan, sosial kemasyarakatan, pemberdayaan perempuan dan perlindungan anak.

KEPALA SEKSI PELAYANAN
Bapak Teguh Prasetyo, A.Md
Melayani perizinan, rekomendasi, legalisasi dokumen, dan pelayanan administratif lainnya.

STAF KELURAHAN:
- Bapak Joko Susilo (Staf Administrasi)
- Ibu Winarti (Staf Keuangan)
- Bapak Suryanto (Staf Umum)
- Ibu Endang Purwati (Staf Pelayanan)

ALAMAT KANTOR:
Jl. Karangpucung No. 15, Kelurahan Karangpucung
Kecamatan Purwokerto Selatan, Kabupaten Banyumas
Kode Pos: 53142
Telepon: (0281) 635421
Email: karangpucung.purwokertoselatan@banyumaskab.go.id

JAM PELAYANAN:
Senin - Kamis: 08.00 - 15.00 WIB
Jumat: 08.00 - 11.30 WIB
Sabtu: 08.00 - 12.00 WIB (Khusus pelayanan mendesak)`,
  },
  sejarah: {
    title: 'Sejarah Kelurahan',
    content: `SEJARAH KELURAHAN KARANGPUCUNG

Kelurahan Karangpucung memiliki sejarah panjang yang dimulai sejak era Kerajaan Majapahit. Nama "Karangpucung" berasal dari kata "Karang" yang berarti batu karang atau tanah tinggi, dan "Pucung" yang merujuk pada buah pucung (Pangium edule) yang banyak tumbuh di wilayah ini pada masa lampau.

PERIODE KERAJAAN (Abad 14-16)
Pada masa Kerajaan Majapahit, wilayah ini merupakan bagian dari daerah perdagangan dan pertanian yang cukup penting. Letak strategisnya di jalur perdagangan Jawa bagian selatan membuat daerah ini berkembang sebagai pusat pengumpulan hasil bumi.

MASA KOLONIAL BELANDA (1619-1945)
Selama penjajahan Belanda, Karangpucung masuk dalam wilayah administratif Keresidenan Banyumas. Belanda membangun sistem irigasi untuk mendukung produksi pertanian, terutama padi dan tebu. Pada periode ini juga dibangun jalan penghubung yang menghubungkan Karangpucung dengan pusat pemerintahan di Purwokerto.

ERA KEMERDEKAAN (1945-1950)
Pasca kemerdekaan Indonesia, Karangpucung menjadi bagian dari Kabupaten Banyumas. Masyarakat setempat aktif dalam perjuangan mempertahankan kemerdekaan, dengan beberapa tokoh masyarakat bergabung dalam laskar rakyat.

PERIODE PEMBANGUNAN (1970-1998)
Pada era Orde Baru, Karangpucung mengalami modernisasi signifikan. Program transmigrasi membawa pengetahuan baru dalam bidang pertanian, sementara pembangunan infrastruktur seperti jalan, sekolah, dan puskesmas mulai intensif dilakukan.

ERA REFORMASI HINGGA KINI (1998-Sekarang)
Dalam era reformasi, Karangpucung bertransformasi menjadi kelurahan modern dengan tetap mempertahankan nilai-nilai tradisional. Program-program pemberdayaan masyarakat, pengembangan UMKM, dan digitalisasi pelayanan publik terus dikembangkan.

Kini Kelurahan Karangpucung dikenal sebagai salah satu kelurahan percontohan di Kabupaten Banyumas dalam hal tata kelola pemerintahan yang baik, inovasi pelayanan publik, dan pemberdayaan masyarakat berbasis potensi lokal.`,
  },
  fiturGrid: {
    title: 'Program Unggulan',
    type: 'grid',
    items: [
      {
        icon: '🌾',
        title: 'Pertanian Berkelanjutan',
        description: 'Program pemberdayaan petani dengan teknologi modern, sistem irigasi tetes, pengembangan pertanian organik, dan pembentukan 15 kelompok tani aktif. Hasil produksi meningkat 35% dalam 3 tahun terakhir.',
      },
      {
        icon: '🏪',
        title: 'Pengembangan UMKM',
        description: 'Program pembinaan 150+ UMKM lokal meliputi pelatihan manajemen usaha, akses permodalan melalui koperasi, pemasaran digital, dan pengembangan produk unggulan seperti keripik singkong dan dodol tape.',
      },
      {
        icon: '🎓',
        title: 'Kampung KB Juara',
        description: 'Program Kampung Keluarga Berencana yang meraih juara 1 tingkat Provinsi Jawa Tengah 2023. Meliputi edukasi kesehatan reproduksi, pemberdayaan ekonomi keluarga, dan pengasuhan anak berkualitas.',
      },
      {
        icon: '🏥',
        title: 'Pelayanan Kesehatan Prima',
        description: 'Puskesmas Pembantu dengan 2 dokter dan 6 perawat, 8 Posyandu aktif, program Prolanis untuk lansia, dan layanan kesehatan keliling yang menjangkau seluruh RT. Angka stunting turun menjadi 2,1%.',
      },
      {
        icon: '📚',
        title: 'Gerakan Literasi Desa',
        description: 'Perpustakaan kelurahan dengan 2.500+ koleksi buku, 5 taman baca masyarakat, program kelas belajar gratis untuk anak, dan pelatihan komputer untuk remaja dan dewasa.',
      },
      {
        icon: '♻️',
        title: 'Kelurahan Hijau',
        description: 'Program pengelolaan sampah 3R, bank sampah dengan 200+ nasabah, penanaman 1.000 pohon per tahun, dan kampung organik dengan kompos mandiri. Meraih penghargaan Adiwiyata tingkat kabupaten.',
      },
      {
        icon: '🏛️',
        title: 'Digitalisasi Pelayanan',
        description: 'Sistem pelayanan online terintegrasi, aplikasi mobile untuk warga, database kependudukan digital, dan layanan administrasi 24/7. Tingkat kepuasan masyarakat mencapai 94%.',
      },
      {
        icon: '🎭',
        title: 'Pelestarian Budaya',
        description: 'Festival Budaya Karangpucung tahunan, sanggar seni tradisional dengan 50+ anggota, pembelajaran bahasa Jawa untuk anak, dan dokumentasi cerita rakyat lokal dalam bentuk buku dan video.',
      },
    ],
  },
};

function Tentang() {
  const [currentSection, setCurrentSection] = useState('profil');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'profil', icon: <Info size={18} />, label: 'Profil' },
    { key: 'visiMisi', icon: <BookOpen size={18} />, label: 'Visi & Misi' },
    { key: 'perangkat', icon: <Users size={18} />, label: 'Perangkat Desa' },
    { key: 'sejarah', icon: <Menu size={18} />, label: 'Sejarah' },
    { key: 'fiturGrid', icon: <Star size={18} />, label: 'Program Unggulan' },
  ];

  const handleSectionChange = (sectionKey) => {
    setCurrentSection(sectionKey);
    setIsMobileMenuOpen(false);
  };

  return (
    <Element name="tentang">
      <section className=" bg-black py-15 min-h-screen" id="tentang">
        <div className="container mx-auto max-w-6xl px-6 md:px-10 ">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">Tentang Karangpucung</h1>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full" />
          </div>

          <div className="flex flex-col lg:flex-row gap-8 ">
            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full flex items-center justify-between p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white hover:bg-slate-700/50 transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  {navItems.find((item) => item.key === currentSection)?.icon}
                  {navItems.find((item) => item.key === currentSection)?.label}
                </span>
                <ChevronRight className={`transform transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} size={20} />
              </button>
            </div>

            {/* Sidebar Navigation */}
            <aside className={`lg:w-80 w-full ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-8 border border-slate-700 rounded-2xl p-6 shadow-2xl">
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => handleSectionChange(item.key)}
                      className={`w-full group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left ${
                        currentSection === item.key
                          ? 'bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 text-green-300 shadow-lg'
                          : 'text-slate-300 hover:bg-slate-700/40 hover:text-white hover:border-slate-600/50 border border-transparent'
                      }`}
                    >
                      <div className={`p-2 rounded-lg transition-all duration-300 ${currentSection === item.key ? 'bg-green-500/20 text-green-300' : 'bg-slate-700/50 text-slate-400 group-hover:bg-slate-600/50 group-hover:text-slate-300'}`}>
                        {item.icon}
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
              <div key={currentSection} className=" backdrop-blur-sm border border-slate-700 rounded-2xl p-8 lg:p-12 shadow-2xl transform transition-all duration-500 hover:shadow-3xl">
                {/* Section Header */}
                <div className="mb-8">
                  <h2 className="text-3xl lg:text-4xl font-bold text-green-600 mb-4">{sections[currentSection].title}</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-green-800 rounded-full" />
                </div>

                {/* Content */}
                {sections[currentSection].type === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sections[currentSection].items.map((item, index) => (
                      <div
                        key={index}
                        className="group bg-slate-700/30 backdrop-blur-sm border border-slate-600/30 p-6 rounded-xl hover:bg-slate-600/40 hover:border-green-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1"
                      >
                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                        <h4 className="text-xl font-semibold text-green-700 mb-3 transition-colors duration-300">{item.title}</h4>
                        <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">{item.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="prose prose-invert prose-slate max-w-none">
                    <p className="text-slate-200 whitespace-pre-line text-lg leading-relaxed">{sections[currentSection].content}</p>
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
