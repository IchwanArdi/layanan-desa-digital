// File: components/Admin/StatsCards.jsx
import { CheckCircle, Clock, AlertCircle, XCircle, FileText, Users, MessageSquare } from 'lucide-react';

const StatsCards = ({
  statusCount,
  totalItems,
  darkMode,
  type = 'pengajuan', // 'pengajuan', 'pengaduan', atau custom
  customStats = null, // untuk konfigurasi custom
}) => {
  // Konfigurasi default untuk berbagai jenis data
  const getStatsConfig = () => {
    if (customStats) return customStats; // Jika ada custom config, gunakan itu

    const configs = {
      pengajuan: [
        {
          title: 'Total',
          value: totalItems,
          icon: FileText,
          bgColor: darkMode ? 'bg-slate-700' : 'bg-gray-100',
          textColor: darkMode ? 'text-gray-300' : 'text-gray-600',
          valueColor: darkMode ? 'text-white' : 'text-gray-900',
        },
        {
          title: 'Menunggu',
          value: statusCount.menunggu || 0,
          icon: Clock,
          bgColor: darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100',
          textColor: darkMode ? 'text-yellow-300' : 'text-yellow-600',
          valueColor: darkMode ? 'text-yellow-300' : 'text-yellow-600',
        },
        {
          title: 'Proses',
          value: statusCount.proses || 0,
          icon: AlertCircle,
          bgColor: darkMode ? 'bg-blue-900/30' : 'bg-blue-100',
          textColor: darkMode ? 'text-blue-300' : 'text-blue-600',
          valueColor: darkMode ? 'text-blue-300' : 'text-blue-600',
        },
        {
          title: 'Ditindaklanjuti',
          value: statusCount.ditindaklanjuti || 0,
          icon: CheckCircle,
          bgColor: darkMode ? 'bg-green-900/30' : 'bg-green-100',
          textColor: darkMode ? 'text-green-300' : 'text-green-600',
          valueColor: darkMode ? 'text-green-300' : 'text-green-600',
        },
        {
          title: 'Selesai',
          value: statusCount.selesai || 0,
          icon: XCircle,
          bgColor: darkMode ? 'bg-red-900/30' : 'bg-red-100',
          textColor: darkMode ? 'text-red-300' : 'text-red-600',
          valueColor: darkMode ? 'text-red-300' : 'text-red-600',
        },
      ],

      pengaduan: [
        {
          title: 'Total',
          value: totalItems,
          icon: MessageSquare,
          bgColor: darkMode ? 'bg-slate-700' : 'bg-gray-100',
          textColor: darkMode ? 'text-gray-300' : 'text-gray-600',
          valueColor: darkMode ? 'text-white' : 'text-gray-900',
        },
        {
          title: 'Menunggu',
          value: statusCount.menunggu || 0,
          icon: Clock,
          bgColor: darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100',
          textColor: darkMode ? 'text-yellow-300' : 'text-yellow-600',
          valueColor: darkMode ? 'text-yellow-300' : 'text-yellow-600',
        },
        {
          title: 'Proses',
          value: statusCount.proses || 0,
          icon: AlertCircle,
          bgColor: darkMode ? 'bg-blue-900/30' : 'bg-blue-100',
          textColor: darkMode ? 'text-blue-300' : 'text-blue-600',
          valueColor: darkMode ? 'text-blue-300' : 'text-blue-600',
        },
        {
          title: 'Ditindaklanjuti',
          value: statusCount.ditindaklanjuti || 0,
          icon: CheckCircle,
          bgColor: darkMode ? 'bg-green-900/30' : 'bg-green-100',
          textColor: darkMode ? 'text-green-300' : 'text-green-600',
          valueColor: darkMode ? 'text-green-300' : 'text-green-600',
        },
        {
          title: 'Selesai',
          value: statusCount.selesai || 0,
          icon: XCircle,
          bgColor: darkMode ? 'bg-red-900/30' : 'bg-red-100',
          textColor: darkMode ? 'text-red-300' : 'text-red-600',
          valueColor: darkMode ? 'text-red-300' : 'text-red-600',
        },
      ],

      users: [
        {
          title: 'Total User',
          value: totalItems,
          icon: Users,
          bgColor: darkMode ? 'bg-slate-700' : 'bg-gray-100',
          textColor: darkMode ? 'text-gray-300' : 'text-gray-600',
          valueColor: darkMode ? 'text-white' : 'text-gray-900',
        },
        {
          title: 'Admin',
          value: statusCount.admin || 0,
          icon: Users,
          bgColor: darkMode ? 'bg-purple-900/30' : 'bg-purple-100',
          textColor: darkMode ? 'text-purple-300' : 'text-purple-600',
          valueColor: darkMode ? 'text-purple-300' : 'text-purple-600',
        },
        {
          title: 'Warga',
          value: statusCount.warga || 0,
          icon: Users,
          bgColor: darkMode ? 'bg-green-900/30' : 'bg-green-100',
          textColor: darkMode ? 'text-green-300' : 'text-green-600',
          valueColor: darkMode ? 'text-green-300' : 'text-green-600',
        },
      ],
    };

    return configs[type] || configs.pengajuan;
  };

  const statsData = getStatsConfig();

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8`}>
      {statsData.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className={`${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center">
              <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                <IconComponent className={`w-6 h-6 ${stat.textColor}`} />
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.valueColor}`}>{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
