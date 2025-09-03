import React, { useState, useMemo } from 'react';
import GlassCard from '../common/GlassCard';
import { useAuth } from '../../hooks/useAuth';
import { students, hafalanLogs } from '../../data/mockData';
import { SURAHS } from '../../constants';

const HafalanProgress: React.FC = () => {
    const { user } = useAuth();

    const getInitialStudentId = () => {
        if (user?.role === 'parent' && user.studentId) {
            return String(user.studentId);
        }
        if (user?.role === 'teacher' && students.length > 0) {
            return String(students[0].id);
        }
        return '';
    };

    const [selectedStudentId, setSelectedStudentId] = useState<string>(getInitialStudentId());

    const memorizedSurahs = useMemo(() => {
        if (!selectedStudentId) return new Set<string>();
        const studentLogs = hafalanLogs.filter(
            log => log.studentId === Number(selectedStudentId) && log.nilai >= 85
        );
        return new Set(studentLogs.map(log => log.surat));
    }, [selectedStudentId]);

    const selectedStudent = students.find(s => s.id === Number(selectedStudentId));

    return (
        <GlassCard className="p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                <h2 className="font-poppins text-xl text-white">Progress Hafalan Juz Amma</h2>
                {user?.role === 'teacher' && students.length > 0 && (
                    <select
                        value={selectedStudentId}
                        onChange={e => setSelectedStudentId(e.target.value)}
                        className="w-full sm:w-auto px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pastel-green text-sm"
                        aria-label="Pilih Siswa untuk melihat progress hafalan"
                    >
                        {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                )}
            </div>

            {!selectedStudentId ? (
                <div className="text-center py-10 text-gray-400">
                    Tidak ada data siswa untuk ditampilkan.
                </div>
            ) : (
                <>
                    <p className="text-gray-300 mb-4">
                        Total Hafalan <span className="font-bold text-white">{selectedStudent?.name || 'Siswa'}</span>:
                        <span className="font-mono text-lg text-pastel-green-300 ml-2">{memorizedSurahs.size}</span>
                        <span className="text-gray-400"> / {SURAHS.length}</span>
                    </p>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                        {SURAHS.map(surah => {
                            const isMemorized = memorizedSurahs.has(surah);
                            return (
                                <div
                                    key={surah}
                                    title={surah}
                                    className={`text-center p-2 rounded-lg text-sm transition-all duration-200 truncate ${
                                        isMemorized
                                            ? 'bg-pastel-green text-white font-semibold'
                                            : 'bg-white/10 text-gray-300'
                                    }`}
                                >
                                    {surah}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </GlassCard>
    );
};

export default HafalanProgress;