
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'teacher' | 'parent';
  studentId?: number; 
}

export interface Student {
  id: number;
  name: string;
  class: string;
  parentId: number;
}

export interface TartiliLog {
  id: number;
  studentId: number;
  tartili: number;
  halaman: number;
  nilai: number;
  catatan: string;
  tanggal: string;
}

export interface HafalanLog {
  id: number;
  studentId: number;
  surat: string;
  ayat_dari: number;
  ayat_sampai: number;
  nilai: number;
  catatan: string;
  tanggal: string;
}

export type ViewType = 'dashboard' | 'tartili' | 'hafalan' | 'laporan' | 'profil';