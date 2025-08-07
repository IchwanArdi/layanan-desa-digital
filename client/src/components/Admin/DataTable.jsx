import React from 'react';
import { Eye, FileText } from 'lucide-react';

const DataTable = ({ data, userData, darkMode, getUserInfo, columns, emptyMessage }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
        <thead className={`${darkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`${darkMode ? 'bg-slate-800 divide-slate-700' : 'bg-white divide-gray-200'} divide-y`}>
          {data.map((item) => {
            const userInfo = getUserInfo(item.warga, userData);
            return (
              <tr key={item._id} className={`${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50'}`}>
                {columns.map((column, index) => (
                  <td key={index} className={column.className || 'px-6 py-4 whitespace-nowrap'}>
                    {column.render ? column.render(item, userInfo, darkMode) : item[column.field]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="text-center py-12">
          <FileText className={`mx-auto h-12 w-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          <h3 className={`mt-2 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{emptyMessage.title}</h3>
          <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{emptyMessage.description}</p>
        </div>
      )}
    </div>
  );
};

export default DataTable;
