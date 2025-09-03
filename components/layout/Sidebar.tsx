import React from 'react';
import { ViewType } from '../../types';
import DashboardIcon from '../icons/DashboardIcon';
import BookOpenIcon from '../icons/BookOpenIcon';
import DocumentTextIcon from '../icons/DocumentTextIcon';
import ChartBarIcon from '../icons/ChartBarIcon';
import UserIcon from '../icons/UserIcon';
import LogoutIcon from '../icons/LogoutIcon';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const { user, logout } = useAuth();
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    user?.role === 'teacher' && { id: 'tartili', label: 'Catatan Tartili', icon: <BookOpenIcon /> },
    user?.role === 'teacher' && { id: 'hafalan', label: 'Hafalan Surat', icon: <DocumentTextIcon /> },
    { id: 'laporan', label: 'Laporan', icon: <ChartBarIcon /> },
    { id: 'profil', label: 'Profil', icon: <UserIcon /> },
  ].filter(Boolean);

  const NavItem: React.FC<{ item: any }> = ({ item }) => (
    <button
      onClick={() => setView(item.id)}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
        currentView === item.id
          ? 'bg-white/30 text-white'
          : 'text-gray-200 hover:bg-white/20 hover:text-white'
      }`}
    >
      <span className="mr-3 h-6 w-6">{item.icon}</span>
      {item.label}
    </button>
  );

  return (
    <aside className="w-64 p-4">
      <div className="h-full bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-4 flex flex-col">
        <div className="flex items-center mb-8">
          <div className="bg-pastel-green p-2 rounded-lg mr-3">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v11.494m-5.243-7.494H12m0 0h5.243M12 17.747M5.253 12H12m0 0h6.747M12 6.253c1.657 0 3 2.803 3 6.247s-1.343 6.247-3 6.247c-1.657 0-3-2.803-3-6.247s1.343-6.247 3-6.247z"/></svg>
          </div>
          <h1 className="text-white font-poppins text-xl">NgajiApp</h1>
        </div>
        <nav className="flex-grow space-y-2">
          {navItems.map(item => item && <NavItem key={item.id} item={item} />)}
        </nav>

        <div className="pt-2 border-t border-white/10">
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 text-gray-200 hover:bg-red-500/20 hover:text-red-100"
              aria-label="Keluar"
            >
              <span className="mr-3 h-6 w-6"><LogoutIcon /></span>
              Keluar
            </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;