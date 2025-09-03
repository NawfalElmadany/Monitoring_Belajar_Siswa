
import React, { useState, useMemo } from 'react';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/Login';
import { AuthContext } from './context/AuthContext';
import { User } from './types';
import { users } from './data/mockData';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (email: string) => {
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
    } else {
      alert("User not found");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const authContextValue = useMemo(() => ({
    user: currentUser,
    login: handleLogin,
    logout: handleLogout,
  }), [currentUser]);

  return (
    <AuthContext.Provider value={authContextValue}>
      <div className="min-h-screen w-full bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?blur=5')" }}>
        <div className="min-h-screen w-full bg-black/10">
          {currentUser ? <MainLayout /> : <LoginPage />}
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
