// src/api/attendance.ts
import axios from '@/lib/axios'
import type { AttendanceValidationResponse, CheckInOutPayload, BaseResponse } from '@/types/Attendance'

export async function validateAttendance(): Promise<AttendanceValidationResponse> {
  const res = await axios.get('/attendance/validation')
  return res.data
}

export async function checkIn(payload: CheckInOutPayload): Promise<BaseResponse> {
  const res = await axios.post('/attendance/in', payload)
  return res.data
}

export async function checkOut(payload: CheckInOutPayload): Promise<BaseResponse> {
  const res = await axios.post('/attendance/out', payload)
  return res.data
}
