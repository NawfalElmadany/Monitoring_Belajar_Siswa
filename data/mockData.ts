
import type { User, Student, TartiliLog, HafalanLog } from '../types';

export const users: User[] = [
  { id: 1, name: "Ustadz Ahmad", email: "guru@ngaji.com", role: 'teacher' },
  { id: 2, name: "Bapak Budi", email: "wali@ngaji.com", role: 'parent', studentId: 1 },
];

export const students: Student[] = [
  { id: 1, name: "Ali bin Budi", class: "A", parentId: 2 },
  { id: 2, name: "Fatimah", class: "A", parentId: 3 },
  { id: 3, name: "Hasan", class: "B", parentId: 4 },
  { id: 4, name: "Aisyah", class: "B", parentId: 5 },
];

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

export const tartiliLogs: TartiliLog[] = [
  { id: 1, studentId: 1, tartili: 2, halaman: 15, nilai: 85, catatan: "Makhraj huruf 'ain perlu dilatih lagi.", tanggal: yesterday.toISOString().split('T')[0] },
  { id: 2, studentId: 2, tartili: 3, halaman: 5, nilai: 90, catatan: "Bacaan sudah lancar dan tartil.", tanggal: today.toISOString().split('T')[0] },
  { id: 3, studentId: 1, tartili: 2, halaman: 16, nilai: 88, catatan: "Sudah ada peningkatan pada huruf 'ain.", tanggal: today.toISOString().split('T')[0] },
  { id: 4, studentId: 3, tartili: 1, halaman: 20, nilai: 80, catatan: "Fokus pada harakat panjang dan pendek.", tanggal: today.toISOString().split('T')[0] },
];

export const hafalanLogs: HafalanLog[] = [
  { id: 1, studentId: 1, surat: "An-Nas", ayat_dari: 1, ayat_sampai: 6, nilai: 95, catatan: "Hafalan sangat lancar.", tanggal: twoDaysAgo.toISOString().split('T')[0] },
  { id: 2, studentId: 2, surat: "Al-Falaq", ayat_dari: 1, ayat_sampai: 5, nilai: 92, catatan: "Tajwid sudah baik.", tanggal: yesterday.toISOString().split('T')[0] },
  { id: 3, studentId: 1, surat: "Al-Falaq", ayat_dari: 1, ayat_sampai: 3, nilai: 88, catatan: "Perlu diulang agar lebih lancar.", tanggal: today.toISOString().split('T')[0] },
  { id: 4, studentId: 4, surat: "Al-Ikhlas", ayat_dari: 1, ayat_sampai: 4, nilai: 98, catatan: "Sangat baik!", tanggal: today.toISOString().split('T')[0] },
];