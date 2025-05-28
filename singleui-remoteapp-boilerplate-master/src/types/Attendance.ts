export interface Attendance {
  id: string;
  date: string;
  time_in: string;
  time_out: string;
  status: string;
  employee_name: string;
}

export interface AttendanceValidationResponse {
  status: boolean
  message?: string
  data?: any
}

export interface CheckInOutPayload {
  timezone: string
  latitude: number | null
  longitude: number | null
  description: string
}

export interface BaseResponse {
    status: boolean,
    message: string,
    data?: any
}
