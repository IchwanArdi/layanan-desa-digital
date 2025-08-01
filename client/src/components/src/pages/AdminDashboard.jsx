import { useState } from 'react';
import StatCard from '../components/StatCard';
import { FaFileAlt, FaBullhorn } from 'react-icons/fa';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/dashboard', {
        credentials: 'include',
      });
      const data = await res.json();
      setDashboardData(data);
    } catch (err) {
      console.error('Error loading dashboard:', err);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:3000/api/dashboard/pengajuan/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await res.json();
      if (res.ok) {
        alert(`Status berhasil diubah menjadi ${newStatus}`);
        fetchData(); // refresh data
      } else {
        alert('Gagal memperbarui status');
        console.error(result);
      }
    } catch (err) {
      console.error('Error update status:', err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Admin</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <StatCard title="Total Pengajuan Dokumen" value={dashboardData?.totalPengajuan || 0} icon={<FaFileAlt />} />
        <StatCard title="Total Pengaduan" value={dashboardData?.totalPengaduan || 0} icon={<FaBullhorn />} />
        <StatCard title="Pengaduan Diproses" value={dashboardData?.totalPengaduanProses || 0} icon={<FaBullhorn />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bagian pengajuan dokumen */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-800 text-lg font-semibold mb-4">Pengajuan Dokumen Terbaru</h3>
          <div className="space-y-4">
            {dashboardData?.pengajuanDokumenTerbaru?.length > 0 ? (
              dashboardData.pengajuanDokumenTerbaru.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                  <p className="font-medium">{item.jenisDokumen}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    Status: <span className="font-semibold">{item.status}</span>
                  </p>

                  {/* Dropdown enum */}
                  <select value={item.status} onChange={(e) => handleUpdateStatus(item._id, e.target.value)} className="border rounded px-3 py-1">
                    <option value="menunggu">Menunggu</option>
                    <option value="proses">Proses</option>
                    <option value="ditindaklanjuti">Ditindaklanjuti</option>
                    <option value="selesai">Selesai</option>
                  </select>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Belum ada pengajuan</p>
            )}
          </div>
        </div>

        {/* Bagian pengaduan */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-800 text-lg font-semibold mb-4">Pengaduan Terbaru</h3>
          <div className="space-y-3">
            {dashboardData?.pengaduanTerbaru?.length > 0 ? (
              dashboardData.pengaduanTerbaru.map((item, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-800 font-medium">{item.judul}</p>
                  <p className="text-gray-600 text-sm">Status: {item.status}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Belum ada pengaduan</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
