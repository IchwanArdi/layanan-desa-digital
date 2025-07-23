import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, User, MessageSquare, CheckCircle, AlertCircle, Facebook, Instagram, Twitter } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulasi pengiriman form
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset status setelah 3 detik
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Alamat Kantor',
      content: 'Jl. Raya Karangpucung No. 123, Karangpucung, Cilacap, Jawa Tengah 53253',
      color: 'text-green-600',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Telepon',
      content: '+62 282 123 4567',
      color: 'text-blue-600',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      content: 'kelurahan@karangpucung.cilacap.go.id',
      color: 'text-red-600',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Jam Pelayanan',
      content: 'Senin - Jumat: 08:00 - 16:00 WIB\nSabtu: 08:00 - 12:00 WIB',
      color: 'text-yellow-600',
    },
  ];

  const socialMedia = [
    { icon: <Facebook className="w-5 h-5" />, name: 'Facebook', link: '#', color: 'hover:text-blue-600' },
    { icon: <Instagram className="w-5 h-5" />, name: 'Instagram', link: '#', color: 'hover:text-pink-600' },
    { icon: <Twitter className="w-5 h-5" />, name: 'Twitter', link: '#', color: 'hover:text-blue-400' },
  ];

  return (
    <section className="bg-black py-16" id="contact">
      <div className="container mx-auto max-w-6xl px-6 md:px-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4 transition-all duration-300 hover:text-green-600">Hubungi Kami</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">Kami siap membantu Anda. Jangan ragu untuk menghubungi kami melalui berbagai cara di bawah ini.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-green-600 mb-6">Informasi Kontak</h2>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-gray-900 border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:border-green-600 hover:shadow-lg hover:shadow-green-600/20 transform hover:-translate-y-1 cursor-pointer group"
                  onMouseEnter={() => setHoveredCard(`info-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`${info.color} mb-3 transition-transform duration-300 ${hoveredCard === `info-${index}` ? 'scale-110' : ''}`}>{info.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">{info.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{info.content}</p>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Ikuti Kami</h3>
              <div className="flex gap-4">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className={`bg-gray-900 border border-gray-700 p-3 rounded-full transition-all duration-300 hover:border-green-600 ${social.color} text-gray-400 transform hover:scale-110 hover:shadow-lg`}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Lokasi Kami</h3>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 text-center hover:border-green-600 transition-all duration-300">
                <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <p className="text-gray-300">Peta lokasi akan ditampilkan di sini</p>
                <button className="mt-4 text-green-600 hover:text-green-400 transition-colors text-sm">Buka di Google Maps →</button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold text-green-600 mb-6">Kirim Pesan</h2>

            <div className="space-y-6">
              {/* Name Input */}
              <div className="group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nama Lengkap *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-green-600 transition-colors" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none transition-all duration-300"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-green-600 transition-colors" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none transition-all duration-300"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              {/* Subject Input */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subjek *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none transition-all duration-300"
                  placeholder="Subjek pesan Anda"
                />
              </div>

              {/* Message Textarea */}
              <div className="group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Pesan *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-500 group-focus-within:text-green-600 transition-colors" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Kirim Pesan
                  </>
                )}
              </button>
            </div>

            {/* Success/Error Messages */}
            {submitStatus && (
              <div
                className={`mt-6 p-4 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                  submitStatus === 'success' ? 'bg-green-600/20 border border-green-600 text-green-400' : 'bg-red-600/20 border border-red-600 text-red-400'
                }`}
              >
                {submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Pesan berhasil dikirim! Kami akan membalas segera.
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    Terjadi kesalahan. Silakan coba lagi.
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-16 text-center border-t border-gray-700 pt-8">
          <p className="text-gray-400 text-sm">Untuk keperluan mendesak, silakan hubungi langsung melalui telepon atau datang ke kantor pada jam pelayanan.</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
