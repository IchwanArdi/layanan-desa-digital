export const getUserInfo = (wargaId, userData) => {
  // Add error handling and debugging
  // console.log('getUserInfo called with:', { wargaId, userData });

  // Check if userData is valid
  if (!userData || !Array.isArray(userData)) {
    return { nama: 'N/A', email: 'N/A' };
  }

  const user = userData.find((user) => user._id === wargaId);
  return user || { nama: 'N/A', email: 'N/A' };
};

export const getStatusBadge = (status, darkMode) => {
  const statusConfig = {
    menunggu: {
      color: darkMode ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-700/50' : 'bg-yellow-100 text-yellow-800',
      text: 'Menunggu',
    },
    proses: {
      color: darkMode ? 'bg-blue-900/30 text-blue-300 border border-blue-700/50' : 'bg-blue-100 text-blue-800',
      text: 'Diproses',
    },
    selesai: {
      color: darkMode ? 'bg-green-900/30 text-green-300 border border-green-700/50' : 'bg-green-100 text-green-800',
      text: 'Selesai',
    },
    ditolak: {
      color: darkMode ? 'bg-red-900/30 text-red-300 border border-red-700/50' : 'bg-red-100 text-red-800',
      text: 'Ditolak',
    },
    ditindaklanjuti: {
      color: darkMode ? 'bg-purple-900/30 text-purple-300 border border-purple-700/50' : 'bg-purple-100 text-purple-800',
      text: 'Ditindaklanjuti',
    },
  };

  const config = statusConfig[status] || {
    color: darkMode ? 'bg-gray-700 text-gray-300 border border-gray-600' : 'bg-gray-100 text-gray-800',
    text: status,
  };

  return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.color}`}>{config.text}</span>;
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';

  try {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};
