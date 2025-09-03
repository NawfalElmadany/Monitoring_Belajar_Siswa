
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import GlassCard from '../components/common/GlassCard';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('guru@ngaji.com');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <GlassCard className="p-8 w-full max-w-md">
        <div className="text-center mb-8">
            <div className="inline-block bg-white p-2 rounded-xl mb-3">
                <img src="https://seeklogo.com/images/A/al-irsyad-al-islamiyyah-logo-5021226857-seeklogo.com.png" alt="Logo Al Irsyad Al Islamiyyah" className="h-12 w-12 object-contain" />
            </div>
          <h1 className="text-3xl font-poppins text-white">Selamat Datang</h1>
          <p className="text-gray-300 mt-2">Masuk untuk memantau perkembangan mengaji.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-200 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pastel-green"
              placeholder="contoh: guru@ngaji.com"
            />
          </div>
          <div className="mb-6">
             <label htmlFor="password" className="block text-gray-200 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value="password"
              readOnly
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pastel-green"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pastel-green text-white font-bold py-3 px-4 rounded-lg hover:bg-pastel-green-600 transition duration-300"
          >
            Masuk
          </button>
           <p className="text-center text-gray-400 text-xs mt-4">
            Gunakan email <span className="font-bold text-gray-300">guru@ngaji.com</span> atau <span className="font-bold text-gray-300">wali@ngaji.com</span>. Password tidak divalidasi.
          </p>
        </form>
      </GlassCard>
    </div>
  );
};

export default LoginPage;