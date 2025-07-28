import { useState } from 'react';
import icon from '../../assets/icon.png';
import { Link } from 'react-router-dom';

export default function AuthForm({ type, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    rt: '',
    rw: '',
    jalan: '',
    nik: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden text-white flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-green-500/5 to-transparent rounded-full"></div>
      </div>

      {/* Form Container */}
      <div className="relative z-10 p-8 rounded-xl max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Side */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-1">{type === 'login' ? 'Login ke Desa Digital' : 'Register ke Desa Digital'}</h2>
            <p className="text-sm text-gray-400">{type === 'login' ? 'Silahkan masukkan Email dan Password Anda.' : 'Isi data lengkap Anda di bawah ini.'}</p>
          </div>

          {type === 'register' && (
            <>
              <input
                type="text"
                name="nama"
                placeholder="Nama Lengkap"
                value={formData.nama}
                onChange={handleChange}
                required
                className="p-2 rounded bg-gray-800 text-white border-2 border-gray-600 focus:outline-none focus:border-green-400 transition duration-300"
              />
              <input
                type="text"
                name="telepon"
                placeholder="08xxxxxxxxxx"
                value={formData.telepon}
                onChange={handleChange}
                required
                className="p-2 rounded bg-gray-800 text-white border-2 border-gray-600 focus:outline-none focus:border-green-400 transition duration-300"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  name="rt"
                  placeholder="RT"
                  value={formData.rt}
                  onChange={handleChange}
                  required
                  className="w-1/2 p-2 rounded bg-gray-800 text-white border-2 border-gray-600 focus:outline-none focus:border-green-400 transition duration-300"
                />
                <input
                  type="text"
                  name="rw"
                  placeholder="RW"
                  value={formData.rw}
                  onChange={handleChange}
                  required
                  className="w-1/2 p-2 rounded bg-gray-800 text-white border-2 border-gray-600 focus:outline-none focus:border-green-400 transition duration-300"
                />
              </div>
              <input
                type="text"
                name="jalan"
                placeholder="Contoh: Jl. Melati No.5"
                value={formData.jalan}
                onChange={handleChange}
                required
                className="p-2 rounded bg-gray-800 text-white border-2 border-gray-600 focus:outline-none focus:border-green-400 transition duration-300"
              />
              <input
                type="text"
                name="nik"
                placeholder="Masukkan NIK 16 digit"
                value={formData.nik}
                onChange={handleChange}
                required
                className="p-2 rounded bg-gray-800 text-white border-2 border-gray-600 focus:outline-none focus:border-green-400 transition duration-300"
              />
            </>
          )}

          {/* Common fields for both login & register */}
          <input
            type="email"
            name="email"
            placeholder="Masukkan Email Aktif"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-2 rounded bg-gray-800 text-white border-2 border-gray-600 focus:outline-none focus:border-green-400 transition duration-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-2 rounded bg-gray-800 text-white border-2 border-gray-600 focus:outline-none focus:border-green-400 transition duration-300"
          />

          <button type="submit" disabled={loading} className={`bg-green-600 hover:bg-green-500 transition duration-300 text-white font-semibold py-2 rounded cursor-pointer w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {loading ? (type === 'login' ? 'Sedang login...' : 'Sedang daftar...') : type === 'login' ? 'Login' : 'Daftar Sekarang'}
          </button>

          <div className="text-center text-sm text-gray-400 mt-2">
            {type === 'login' ? (
              <p>
                Belum punya akun?{' '}
                <Link to="/auth/register" className="text-green-400 hover:underline">
                  Daftar sekarang
                </Link>
              </p>
            ) : (
              <p>
                Sudah punya akun?{' '}
                <Link to="/auth/login" className="text-green-400 hover:underline">
                  Login di sini
                </Link>
              </p>
            )}
          </div>
        </form>

        {/* Image Side */}
        <div className="flex justify-center items-center">
          <img src={icon} alt="icon" className="hidden sm:flex max-w-full h-auto rounded-xl" />
        </div>
      </div>
    </section>
  );
}
