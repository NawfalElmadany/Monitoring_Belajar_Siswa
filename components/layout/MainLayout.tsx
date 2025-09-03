
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from '../../pages/Dashboard';
import TartiliForm from '../../pages/IqroForm';
import HafalanPage from '../../pages/SurahForm';
import Reports from '../../pages/Reports';
import { ViewType } from '../../types';

const MainLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'tartili':
        return <TartiliForm />;
      case 'hafalan':
        return <HafalanPage />;
      case 'laporan':
        return <Reports />;
      case 'profil':
        return <div className="text-white p-8 font-poppins text-3xl">Halaman Profil (Dalam Pengembangan)</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen text-white font-sans">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <main className="flex-1 p-4 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default MainLayout;