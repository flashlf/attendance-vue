import { views } from './../../../remote-hc-feature/exposed.config';
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Example.vue'
import Attendance from '@/views/AttendanceView.vue'
import AttendanceCard from '@/views/AttendanceCardView.vue'
import AttendanceConfirm from '@/views/AttendanceConfirmationView.vue'
import Dashboard from '@/views/DashboardView.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/attendance/form', name: 'attendance', component: Attendance },
  { path: '/attendance/card', name: 'attendanceCard', component: AttendanceCard },
  { path: '/attendance/confirmation', name: 'attendanceConfirm', component: AttendanceConfirm },
  { path: '/dashboard', name: 'dashboard', component: Dashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
