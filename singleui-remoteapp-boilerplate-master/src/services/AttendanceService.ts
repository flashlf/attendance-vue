import axios from 'axios';
import type { Attendance } from '@/types/Attendance';

const API = axios.create({
  baseURL: 'http://localhost:1337', // ganti sesuai env-mu
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const fetchAttendanceList = async (params: {
  page: number;
  limit: number;
  search?: string;
  start?: string;
  orderBy?: string;
  orderDir?: 'asc' | 'desc';
}) => {
  const response = await API.get<{ data: Attendance[]; total: number }>('/attendance', {
    params
  });
  return response.data;
};
