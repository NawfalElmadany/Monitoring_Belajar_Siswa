import React from 'react';
import { useAuth } from '../hooks/useAuth';
import GlassCard from '../components/common/GlassCard';
import { students, tartiliLogs, hafalanLogs } from '../data/mockData';
import { Student } from '../types';
import ProgressChart from '../components/dashboard/ProgressChart';
import HafalanProgress from '../components/dashboard/HafalanProgress';
// FIX: Import missing icon components.
import ChartBarIcon from '../components/icons/ChartBarIcon';
import DocumentTextIcon from '../components/icons/DocumentTextIcon';
import UserIcon from '../components/icons/UserIcon';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <GlassCard className="p-6 flex items-center">
    <div className="p-3 rounded-lg bg-pastel-green/80 mr-4">{icon}</div>
    <div>
      <p className="text-gray-300 text-sm">{title}</p>
      <p className="text-2xl font-poppins text-white">{value}</p>
    </div>
  </GlassCard>
);

const RecentLogItem: React.FC<{ student: Student; log: any }> = ({ student, log }) => (
    <div className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0">
        <div>
            <p className="font-semibold text-white">{student.name}</p>
            <p className="text-sm text-gray-300">
                {'tartili' in log ? `Tartili ${log.tartili} Hal. ${log.halaman}` : `Hafalan ${log.surat}`}
            </p>
        </div>
        <div className="text-right">
             <p className="font-mono text-xl text-pastel-green-300">{log.nilai}</p>
             <p className="text-xs text-gray-400">{new Date(log.tanggal).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})}</p>
        </div>
    </div>
);


const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const studentForParent = user?.role === 'parent' ? students.find(s => s.id === user.studentId) : null;
  const targetStudents = studentForParent ? [studentForParent] : students;

  const totalSiswa = students.length;
  const totalCatatan = tartiliLogs.length + hafalanLogs.length;
  
  const allLogs = [...tartiliLogs, ...hafalanLogs]
    .filter(log => targetStudents.some(s => s.id === log.studentId))
    .sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
  
  const recentLogs = allLogs.slice(0, 5);

  const avgNilai = allLogs.length > 0 ? (allLogs.reduce((sum, log) => sum + log.nilai, 0) / allLogs.length).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-4xl font-poppins text-white">Dashboard</h1>
        <p className="text-gray-300 mt-1">Selamat datang kembali, {user?.name}!</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title={user?.role === 'teacher' ? "Total Siswa" : "Siswa"} value={user?.role === 'teacher' ? String(totalSiswa) : studentForParent?.name || "N/A"} icon={<UserIcon />} />
        <StatCard title="Total Catatan" value={String(allLogs.length)} icon={<DocumentTextIcon />} />
        <StatCard title="Rata-rata Nilai" value={avgNilai} icon={<ChartBarIcon />} />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 p-6">
            <h2 className="font-poppins text-xl text-white mb-4">Grafik Perkembangan Nilai</h2>
            <div className="h-80">
                <ProgressChart data={allLogs} />
            </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="font-poppins text-xl text-white mb-4">Aktivitas Terbaru</h2>
           <div className="space-y-2">
                {recentLogs.length > 0 ? recentLogs.map(log => {
                    const student = students.find(s => s.id === log.studentId);
                    return student ? <RecentLogItem key={`${log.id}-${log.tanggal}`} student={student} log={log} /> : null;
                }) : (
                  <p className="text-center text-gray-400 pt-8">Belum ada aktivitas.</p>
                )}
            </div>
        </GlassCard>
      </div>

      {/* Hafalan Progress */}
      <HafalanProgress />

    </div>
  );
};

export default Dashboard;