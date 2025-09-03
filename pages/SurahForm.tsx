
import React, { useState } from 'react';
import GlassCard from '../components/common/GlassCard';
import { students } from '../data/mockData';
import { SURAHS } from '../constants';
import HafalanProgress from '../components/dashboard/HafalanProgress';

// The form is now a sub-component
const AddHafalanForm: React.FC = () => {
    const [studentId, setStudentId] = useState('');
    const [surat, setSurat] = useState(SURAHS[0]);
    const [ayatDari, setAyatDari] = useState('');
    const [ayatSampai, setAyatSampai] = useState('');
    const [nilai, setNilai] = useState(80);
    const [catatan, setCatatan] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Data Hafalan Tersimpan:\nSiswa: ${students.find(s=>s.id === Number(studentId))?.name}\nSurat: ${surat}\nAyat: ${ayatDari}-${ayatSampai}\nNilai: ${nilai}\nCatatan: ${catatan}`);
    };
    
    return (
         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-gray-200 text-sm font-medium mb-2">Nama Siswa</label>
                    <select value={studentId} onChange={e => setStudentId(e.target.value)} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pastel-green">
                        <option value="" disabled>Pilih Siswa</option>
                        {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>
                 <div>
                    <label className="block text-gray-200 text-sm font-medium mb-2">Surat</label>
                    <select value={surat} onChange={e => setSurat(e.target.value)} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pastel-green">
                        {SURAHS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                 <div>
                    <label className="block text-gray-200 text-sm font-medium mb-2">Ayat Dari</label>
                    <input type="number" value={ayatDari} onChange={e => setAyatDari(e.target.value)} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pastel-green"/>
                </div>
                <div>
                    <label className="block text-gray-200 text-sm font-medium mb-2">Ayat Sampai</label>
                    <input type="number" value={ayatSampai} onChange={e => setAyatSampai(e.target.value)} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pastel-green"/>
                </div>
            </div>
            <div>
                <label className="block text-gray-200 text-sm font-medium mb-2">Nilai</label>
                <div className="flex items-center space-x-4">
                    <input type="range" min="0" max="100" value={nilai} onChange={e => setNilai(Number(e.target.value))} className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-pastel-green"/>
                    <span className="font-mono text-xl text-white bg-white/20 px-3 py-1 rounded-md w-20 text-center">{nilai}</span>
                </div>
            </div>
             <div>
                <label className="block text-gray-200 text-sm font-medium mb-2">Catatan Guru</label>
                <textarea value={catatan} onChange={e => setCatatan(e.target.value)} rows={3} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pastel-green" placeholder="Tulis catatan untuk wali murid..."></textarea>
            </div>
             <div className="flex justify-end">
                <button type="submit" className="bg-pastel-green text-white font-bold py-3 px-6 rounded-lg hover:bg-pastel-green-600 transition duration-300">
                   Simpan Catatan
                </button>
            </div>
        </form>
    );
};

const HafalanPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-4xl font-poppins text-white mb-6">Manajemen Hafalan</h1>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
                <div className="lg:col-span-3">
                    <HafalanProgress />
                </div>
                <div className="lg:col-span-2">
                     <GlassCard className="p-6 h-full">
                         <h2 className="font-poppins text-xl text-white mb-4">Tambah Catatan Baru</h2>
                         <AddHafalanForm />
                     </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default HafalanPage;