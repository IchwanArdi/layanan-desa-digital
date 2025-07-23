import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Menu, Info, Users, BookOpen, Star } from 'lucide-react';
import { Element } from 'react-scroll';

const sections = {
  profil: {
    title: 'Profil Kelurahan',
    content: `Kelurahan Karangpucung adalah salah satu kelurahan yang terletak di Kecamatan Purwokerto Selatan, Kabupaten Banyumas, Jawa Tengah. Kelurahan ini memiliki luas wilayah yang strategis dengan mayoritas penduduknya bekerja sebagai petani, pedagang, dan ada yang merantau ke luar daerah bahkan hingga luar negeri.

Karangpucung memiliki tanah pertanian yang subur sehingga menyediakan banyak peluang bagi para petani untuk menanam padi, jagung, kacang tanah, ubi kayu, dan berbagai tanaman lainnya. Kelurahan ini juga memiliki akses yang baik ke pusat kota Purwokerto sebagai bagian dari wilayah perkotaan.`,
  },
  visiMisi: {
    title: 'Visi & Misi',
    content: `Visi:
"Terwujudnya Masyarakat Karangpucung yang Sejahtera, Mandiri, dan Berdaya Saing dalam Bingkai Tata Kelola Pemerintahan yang Baik"

Misi:
1) Meningkatkan kualitas pelayanan publik yang prima dan transparan
2) Mengembangkan potensi ekonomi masyarakat berbasis pertanian dan perdagangan
3) Meningkatkan kualitas pendidikan dan kesehatan masyarakat
4) Memperkuat kelembagaan masyarakat dan partisipasi warga
5) Melestarikan budaya dan nilai-nilai luhur masyarakat Banyumas`,
  },
  perangkat: {
    title: 'Perangkat Kelurahan',
    content: `Struktur Organisasi Kelurahan Karangpucung:

Lurah: [Nama Lurah akan diperbarui sesuai data terkini]
Sekretaris Lurah: [Nama Sekretaris]
Kasi Pemerintahan: [Nama Kasi]
Kasi Kesejahteraan Rakyat: [Nama Kasi]
Kasi Pelayanan: [Nama Kasi]

Kelurahan Karangpucung beralamat di Jalan Kecamatan Purwokerto Selatan dengan Kode Pos 53142, dan menjadi pusat administrasi pemerintahan serta pelayanan masyarakat di wilayah Karangpucung.`,
  },
  sejarah: {
    title: 'Sejarah Kelurahan',
    content: `Kelurahan Karangpucung memiliki sejarah panjang sebagai bagian dari wilayah Purwokerto Selatan di Kabupaten Banyumas. Nama "Karangpucung" sendiri berasal dari bahasa Jawa yang menggambarkan karakteristik wilayah ini.

Sebagai bagian dari Kabupaten Banyumas, Karangpucung telah mengalami berbagai perkembangan dari masa ke masa. Wilayah ini dulunya merupakan daerah pertanian yang berkembang dengan pesat karena kesuburan tanahnya dan letaknya yang strategis.

Dalam perkembangannya, Karangpucung terus bertransformasi mengikuti kemajuan zaman. Kini kelurahan ini tidak hanya dikenal sebagai daerah pertanian, tetapi juga sebagai bagian integral dari perkembangan Kota Purwokerto yang modern.`,
  },
  fiturGrid: {
    title: 'Program Unggulan',
    type: 'grid',
    items: [
      {
        icon: '🌾',
        title: 'Pertanian Berkelanjutan',
        description: 'Pemberdayaan petani dengan teknologi modern dan sistem irigasi yang baik untuk meningkatkan hasil panen.',
      },
      {
        icon: '🏪',
        title: 'Pengembangan UMKM',
        description: 'Program pembinaan usaha mikro kecil menengah untuk meningkatkan perekonomian masyarakat.',
      },
      {
        icon: '🎓',
        title: 'Kampung KB',
        description: 'Program Kampung Keluarga Berencana yang telah mendapat pengakuan tingkat Provinsi Jawa Tengah.',
      },
      {
        icon: '🏥',
        title: 'Pelayanan Kesehatan',
        description: 'Puskesmas dan posyandu yang melayani kesehatan masyarakat dengan fasilitas yang memadai.',
      },
    ],
  },
};

function Tentang() {
  const [currentSection, setCurrentSection] = useState('profil');

  const navItems = [
    { key: 'profil', icon: <Info size={20} />, label: 'Profil' },
    { key: 'visiMisi', icon: <BookOpen size={20} />, label: 'Visi & Misi' },
    { key: 'perangkat', icon: <Users size={20} />, label: 'Perangkat Desa' },
    { key: 'sejarah', icon: <Menu size={20} />, label: 'Sejarah' },
    { key: 'fiturGrid', icon: <Star size={20} />, label: 'Program Unggulan' },
  ];

  return (
    <Element name="tentang">
      <section className="bg-black text-white py-10 " id="tentang">
        <div className="container mx-auto max-w-6xl px-6 md:px-10 ">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <aside className="md:w-1/4 w-full p-4 bg-black/30 border border-gray-700 rounded-2xl ">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setCurrentSection(item.key)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-sm font-medium my-2 ${
                    currentSection === item.key ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-green-100 hover:text-black cursor-pointer'
                  }`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </aside>

            {/* Konten */}
            <main className="flex-1 md:mx-2">
              <motion.div key={currentSection} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }} className="bg-gray-900 shadow-md rounded-2xl p-6 md:p-10">
                <h2 className="text-3xl font-bold text-green-400 mb-6">{sections[currentSection].title}</h2>

                {sections[currentSection].type === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {sections[currentSection].items.map((item, index) => (
                      <div key={index} className="bg-gray-800 p-5 rounded-xl shadow hover:shadow-md transition">
                        <div className="text-4xl mb-3">{item.icon}</div>
                        <h4 className="text-xl font-semibold text-green-300 mb-1">{item.title}</h4>
                        <p className="text-gray-300">{item.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-200 whitespace-pre-line text-lg">{sections[currentSection].content}</p>
                )}
              </motion.div>
            </main>
          </div>
        </div>
      </section>
    </Element>
  );
}

export default Tentang;
