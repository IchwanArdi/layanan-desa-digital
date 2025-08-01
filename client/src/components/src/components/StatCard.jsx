import React from 'react';

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
      <div className="text-blue-600 text-3xl">{icon}</div>
    </div>
  );
};

export default StatCard;
