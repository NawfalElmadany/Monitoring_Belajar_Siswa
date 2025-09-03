import React, { useState, useMemo } from 'react';
import GlassCard from '../components/common/GlassCard';
import { useAuth } from '../hooks/useAuth';
import { students, tartiliLogs, hafalanLogs } from '../data/mockData';

const Reports: React.FC = () => {
    const { user } = useAuth();
    
    const getInitialStudentId = () => user?.role === 'parent' ? String(user.studentId) : '';

    const [selectedStudentId, setSelectedStudentId] = useState<string>(getInitialStudentId());
    const [filterType, setFilterType] = useState<'all' | 'tartili' | 'hafalan'>('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleResetFilters = () => {
        setSelectedStudentId(getInitialStudentId());
        setFilterType('all');
        setStartDate('');
        setEndDate('');
        setSearchTerm('');
    };

    const availableStudents = useMemo(() => {
        if (user?.role === 'parent') {
            return students.filter(s => s.id === user.studentId);
        }
        return students;
    }, [user]);

    const logs = useMemo(() => {
        if (!selectedStudentId) return [];

        const allStudentLogs = [
            ...tartiliLogs.map(l => ({ ...l, type: 'Tartili' })),
            ...hafalanLogs.map(l => ({ ...l, type: 'Hafalan' }))
        ]
        .filter(l => l.studentId === Number(selectedStudentId));

        const filteredLogs = allStudentLogs.filter(log => {
            const typeMatch = filterType === 'all' || 
                              (filterType === 'tartili' && log.type === 'Tartili') ||
                              (filterType === 'hafalan' && log.type === 'Hafalan');

            const date = log.tanggal;
            const startDateMatch = !startDate || date >= startDate;
            const endDateMatch = !endDate || date <= endDate;
            
            const searchMatch = !searchTerm || log.catatan.toLowerCase().includes(searchTerm.toLowerCase());

            return typeMatch && startDateMatch && endDateMatch && searchMatch;
        });

        return filteredLogs.sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
    }, [selectedStudentId, filterType, startDate, endDate, searchTerm]);

    return (
        <div>
            <h1 className="text-4xl font-poppins text-white mb-6">Laporan Perkembangan</h1>
            <GlassCard className="p-8">
                <div className="flex flex-wrap gap-4 mb-6 items-end">
                    {user?.role === 'teacher' && (
                        <div className="flex-1 min-w-[200px]">
                            <label htmlFor="student-select" className="block text-gray-200 text-sm font-medium mb-2">Pilih Siswa</label>
                            <select id="student-select" value={selectedStudentId} onChange={e => setSelectedStudentId(e.target.value)} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pastel-green">
                                <option value="" disabled>-- Tampilkan Laporan Untuk --</option>
                                {availableStudents.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                    )}
                     <div className="flex-1 min-w-[200px]">
                        <label htmlFor="type-select" className="block text-gray-200 text-sm font-medium mb-2">Jenis Kegiatan</label>
                        <select id="type-select" value={filterType} onChange={e => setFilterType(e.target.value as any)} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pastel-green">
                            <option value="all">Semua</option>
                            <option value="tartili">Tartili</option>
                            <option value="hafalan">Hafalan</option>
                        </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label htmlFor="start-date" className="block text-gray-200 text-sm font-medium mb-2">Tanggal Mulai</label>
                        <input
                            id="start-date"
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pastel-green"
                            style={{ colorScheme: 'dark' }}
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label htmlFor="end-date" className="block text-gray-200 text-sm font-medium mb-2">Tanggal Selesai</label>
                        <input
                            id="end-date"
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pastel-green"
                            style={{ colorScheme: 'dark' }}
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label htmlFor="search-notes" className="block text-gray-200 text-sm font-medium mb-2">Cari di Catatan</label>
                        <input
                            id="search-notes"
                            type="text"
                            placeholder="Ketik untuk mencari..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pastel-green"
                        />
                    </div>
                     <div>
                        <button
                            onClick={handleResetFilters}
                            className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white hover:bg-white/30 transition-colors duration-200"
                            aria-label="Reset semua filter"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-white/20">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-gray-300 w-28">Tanggal</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 w-32">Kegiatan</th>
                                <th className="p-4 text-sm font-semibold text-gray-300">Detail</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 text-center w-24">Nilai</th>
                                <th className="p-4 text-sm font-semibold text-gray-300">Catatan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length > 0 ? logs.map(log => (
                                <tr key={`${log.type}-${log.id}`} className="border-b border-white/10">
                                    <td className="p-4 align-top">{new Date(log.tanggal).toLocaleDateString('id-ID')}</td>
                                    <td className="p-4 align-top">
                                        <span className={`px-2 py-1 text-xs rounded-full ${log.type === 'Tartili' ? 'bg-blue-500/30 text-blue-200' : 'bg-green-500/30 text-green-200'}`}>{log.type}</span>
                                    </td>
                                    <td className="p-4 align-top">
                                        {'tartili' in log ? `Tartili ${log.tartili} Hal. ${log.halaman}` : `${log.surat} Ayat ${log.ayat_dari}-${log.ayat_sampai}`}
                                    </td>
                                    <td className="p-4 align-top text-center">
                                        <span className="font-mono text-lg text-pastel-green">{log.nilai}</span>
                                    </td>
                                    <td className="p-4 align-top text-gray-300 text-sm max-w-xs">{log.catatan}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="text-center p-8 text-gray-400">
                                        {user?.role === 'teacher' && !selectedStudentId
                                            ? "Silakan pilih siswa untuk melihat laporan."
                                            : "Tidak ada data yang cocok dengan filter."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
};

export default Reports;