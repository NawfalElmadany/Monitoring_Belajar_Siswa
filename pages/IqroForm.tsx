
import React, { useState } from 'react';
import GlassCard from '../components/common/GlassCard';
import { students } from '../data/mockData';

const TartiliForm: React.FC = () => {
    const [studentId, setStudentId] = useState('');
    const [tartili, setTartili] = useState('1');
    const [halaman, setHalaman] = useState('1');
    const [nilai, setNilai] = useState(80);
    const [catatan, setCatatan] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Data Tartili Tersimpan:\nSiswa: ${students.find(s=>s.id === Number(studentId))?.name}\nTartili: ${tartili}\nHalaman: ${halaman}\nNilai: ${nilai}\nCatatan: ${catatan}`);
    };

    return (
        <div>
            <h1 className="text-4xl font-poppins text-white mb-6">Form Catatan Harian Tartili</h1>
            <GlassCard className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-gray-200 text-sm font-medium mb-2">Nama Siswa</label>
                            <select value={studentId} onChange={e => setStudentId(e.target.value)} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pastel-green">
                                <option value="" disabled>Pilih Siswa</option>
                                {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-200 text-sm font-medium mb-2">Tartili</label>
                            <select value={tartili} onChange={e => setTartili(e.target.value)} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pastel-green">
                                {[1,2,3,4,5,6].map(i => <option key={i} value={i}>{`Tartili ${i}`}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-200 text-sm font-medium mb-2">Halaman</label>
                             <select value={halaman} onChange={e => setHalaman(e.target.value)} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pastel-green">
                                {Array.from({length: 30}, (_, i) => i + 1).map(i => <option key={i} value={i}>{`Halaman ${i}`}</option>)}
                            </select>
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
                        <textarea value={catatan} onChange={e => setCatatan(e.target.value)} rows={4} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pastel-green" placeholder="Tulis catatan untuk wali murid..."></textarea>
                    </div>
                     <div className="flex justify-end">
                        <button type="submit" className="bg-pastel-green text-white font-bold py-3 px-6 rounded-lg hover:bg-pastel-green-600 transition duration-300">
                           Simpan Catatan
                        </button>
                    </div>
                </form>
            </GlassCard>
        </div>
    );
};

export default TartiliForm;