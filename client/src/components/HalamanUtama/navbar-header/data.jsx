import { useSettings } from '../../../contexts/SettingsContext';

function getNavItems(role) {
  const { user } = useSettings();
const role = user?.role || null;

const navItems =
  role === 'admin'
    ? [
        { key: 'dashboard', icon: 'Home', label: 'Dashboard' },
        { key: 'pengajuan', icon: 'FileText', label: 'Pengajuan' },
        { key: 'pengaduan', icon: 'MessageSquare', label: 'Pengaduan' },
        { key: 'profil', icon: 'User', label: 'Profil' },
      ]
    : [
        { key: 'dashboard', icon: 'Home', label: 'Dashboard' },
        { key: 'layanan-dokumen', icon: 'FileText', label: 'Ajukan Data' },
        { key: 'pengaduan', icon: 'MessageSquare', label: 'Pengaduan' },
        { key: 'profil', icon: 'User', label: 'Profil' },
      ];



export default navItems;
