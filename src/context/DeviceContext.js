"use client"
import { createContext, useContext, useState, useEffect } from 'react';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [deviceInfo, setDeviceInfo] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false,
    isLandscape: typeof window !== 'undefined' ? window.innerWidth > window.innerHeight : false,
    isTablet: typeof window !== 'undefined' ? window.innerWidth <= 1024 && window.innerWidth > 768 : false,
    aspectRatio: typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 0,
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDeviceInfo({
        width,
        height,
        isMobile: width <= 768,
        isLandscape: width > height,
        isTablet: width <= 1024 && width > 768,
        aspectRatio: width / height,
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