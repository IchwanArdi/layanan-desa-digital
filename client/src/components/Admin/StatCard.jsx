import { useSettings } from '../../contexts/SettingsContext';

const StatCard = ({ title, value, icon }) => {
  const { darkMode } = useSettings();

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-xl p-5 flex items-center justify-between`}>
      <div>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{title}</p>
        <p className={`${darkMode ? 'text-white' : 'text-gray-800'} text-2xl font-semibold`}>{value}</p>
      </div>
      <div className="text-blue-600 text-3xl">{icon}</div>
    </div>
  );
};

export default StatCard;
