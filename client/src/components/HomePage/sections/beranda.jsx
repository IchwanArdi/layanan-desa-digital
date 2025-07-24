import React, { useEffect, useState } from 'react';
import { Element } from 'react-scroll';
import '../../../style/beranda.css';

function Beranda() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Element name="beranda">
        <section className=" bg-dark relative overflow-hidden">
          {/* Main Content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-160px)]">
              {/* Text Content - First on mobile, Second on desktop */}
              <div className={`order-1 lg:order-1 text-center lg:text-left space-y-6 lg:space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium backdrop-blur-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Layanan Digital Terdepan
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
                  <span className="block bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">Layanan Digital</span>
                  <span className="block bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent animate-gradient">Desa untuk Warga</span>
                </h1>

                {/* Subtitle */}
                <p className="text-gray-300 text-lg sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Ajukan data dan sampaikan pengaduan dengan mudah, cepat, dan langsung ke perangkat desa dalam satu platform terintegrasi.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  {/* Primary Button */}
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Ajukan Sekarang
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 rounded-2xl border-2 border-green-400 opacity-0 group-hover:opacity-100 animate-ping"></div>
                  </button>

                  {/* Secondary Button */}
                  <button className="group px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-2xl hover:border-green-500 hover:text-green-400 transition-all duration-300 backdrop-blur-sm">
                    <span className="flex items-center justify-center gap-2">
                      Pelajari Lebih Lanjut
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              {/* Video/Animation Content - Second on mobile, First on desktop */}
              <div className={`order-2 lg:order-2 flex justify-center items-center transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="relative group">
                  {/* Video Container */}
                  <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
                    {/* Glow Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                    {/* Video Placeholder with Animation */}
                    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700/50 backdrop-blur-sm">
                      {/* Floating Animation Placeholder */}
                      <div className="aspect-video bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
                        {/* Animated Circles */}
                        <div className="absolute inset-0">
                          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-green-500/20 rounded-full animate-bounce delay-0"></div>
                          <div className="absolute top-3/4 right-1/4 w-12 h-12 bg-emerald-500/20 rounded-full animate-bounce delay-300"></div>
                          <div className="absolute bottom-1/4 left-1/2 w-8 h-8 bg-green-400/30 rounded-full animate-bounce delay-700"></div>
                        </div>

                        {/* Center Content */}
                        <div className="relative z-10 text-center">
                          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                          <p className="text-gray-400 text-sm">Video Preview</p>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute top-4 right-4 w-6 h-6 bg-green-400/40 rounded-full animate-ping"></div>
                        <div className="absolute bottom-4 left-4 w-4 h-4 bg-emerald-400/40 rounded-full animate-ping delay-500"></div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-emerald-500/5 to-green-500/5 rounded-full animate-pulse delay-1000"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Element>
    </>
  );
}

export default Beranda;
