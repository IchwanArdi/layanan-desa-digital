import StatCard from '../components/Admin/StatCard';
import { FaFileAlt, FaBullhorn } from 'react-icons/fa';
import Header from '../components/HalamanUtama/navbar-header/Header';

const AdminPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Header />
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Admin</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <StatCard title="Total Pengajuan Dokumen" value={0} icon={<FaFileAlt />} />
        <StatCard title="Total Pengaduan" value={0} icon={<FaBullhorn />} />
        <StatCard title="Pengaduan Diproses" value={0} icon={<FaBullhorn />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bagian pengajuan dokumen */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-800 text-lg font-semibold mb-4">Pengajuan Dokumen Terbaru</h3>
          <div className="space-y-4">
            <p className="text-gray-500">Belum ada pengajuan</p>
          </div>
        </div>

        {/* Bagian pengaduan */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-800 text-lg font-semibold mb-4">Pengaduan Terbaru</h3>
          <div className="space-y-3">
            <p className="text-gray-500">Belum ada pengaduan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
