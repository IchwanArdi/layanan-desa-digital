import animasi from '../../assets/animasi.mp4';

function Beranda() {
  return (
    <>
      {/* Section Hero */}
      <section className="pt-5 bg-black">
        <div className="container mx-auto max-w-6xl z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 p-8 mb-10" data-aos="fade-up">
            {/* Video - urutan kedua di mobile */}
            <div className="order-1 md:order-2 flex justify-center" data-aos="zoom-in">
              <video autoPlay loop muted playsInline className="w-60 sm:w-72 md:w-96 lg:w-[500px] h-auto mx-auto rounded-xl shadow-md object-cover">
                <source src={animasi} type="video/mp4" />
                Browser tidak mendukung tag video.
              </video>
            </div>

            {/* Teks - urutan pertama di mobile */}
            <div className="order-2 md:order-1 text-center md:text-left space-y-6">
              <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent leading-tight">Layanan Digital Desa untuk Warga</h2>
              <p className="text-gray-200 text-lg md:text-2xl">Ajukan data dan sampaikan pengaduan dengan mudah, cepat, dan langsung ke perangkat desa.</p>

              {/* Tombol dengan Animasi */}
              <div className="relative">
                <a
                  href="/ajukan"
                  className="group relative inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-md animate-pulse"
                >
                  {/* Background animasi */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Efek shimmer */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>

                  {/* Teks dengan animasi */}
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-200">
                    Ajukan Sekarang
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </span>

                  {/* Ring animasi */}
                  <div className="absolute inset-0 rounded-xl border-2 border-green-400 opacity-0 group-hover:opacity-100 animate-ping"></div>
                </a>

                {/* Glow effect background */}
                <div className="absolute inset-0 bg-green-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(1deg);
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 5px #10b981, 0 0 10px #10b981, 0 0 15px #10b981;
          }
          50% {
            box-shadow: 0 0 10px #10b981, 0 0 20px #10b981, 0 0 30px #10b981;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        /* Tambahan animasi khusus untuk tombol */
        .btn-special {
          position: relative;
          overflow: hidden;
        }

        .btn-special::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.5s;
        }

        .btn-special:hover::before {
          left: 100%;
        }
      `}</style>
    </>
  );
}

export default Beranda;
