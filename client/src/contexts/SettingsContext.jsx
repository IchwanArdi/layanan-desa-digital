import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext(); // Membuat konteks untuk pengaturan

export const SettingsProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('pengaduanDesa_darkMode');
    return saved ? JSON.parse(saved) : true; // Default ke true jika tidak ada di localStorage
  });

  // Simpan perubahan darkMode ke localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('pengaduanDesa_darkMode', JSON.stringify(darkMode));
  }, [darkMode]);
  return <SettingsContext.Provider value={{ darkMode, setDarkMode }}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => useContext(SettingsContext);
