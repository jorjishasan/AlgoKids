"use client"
import { createContext, useContext, useState, useEffect } from 'react';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [deviceInfo, setDeviceInfo] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      setDeviceInfo({
        width: window.innerWidth,
        isMobile: window.innerWidth <= 768
      });
    };

    window.addEventListener('resize', updateDeviceInfo);
    updateDeviceInfo(); // Initial call

    return () => window.removeEventListener('resize', updateDeviceInfo);
  }, []);

  return (
    <DeviceContext.Provider value={deviceInfo}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
}; 