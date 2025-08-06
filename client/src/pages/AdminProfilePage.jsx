import { useSettings } from '../contexts/SettingsContext';

function AdminProfilePage() {
  const { darkMode } = useSettings();

  return (
    <div>
      <h1 className={`${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>Admin Profile</h1>
    </div>
  );
}
export default AdminProfilePage;
