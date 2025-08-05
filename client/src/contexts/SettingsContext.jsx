import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext(); // Membuat konteks untuk pengaturan

export const SettingsProvider = ({ children }) => {
  // State untuk darkMode, defaultnya true (dark mode aktif)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('pengaduanDesa_darkMode');
    return saved ? JSON.parse(saved) : true; // Default ke true jika tidak ada di localStorage
  });

  // State untuk user, defaultnya null
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
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
  return <SettingsContext.Provider value={{ darkMode, setDarkMode, user, setUser }}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => useContext(SettingsContext);
