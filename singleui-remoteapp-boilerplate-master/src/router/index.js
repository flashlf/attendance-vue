import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Example.vue';
import Attendance from '@/views/AttendanceView.vue';
import AttendanceCard from '@/views/AttendanceCardView.vue';
import AttendanceConfirm from '@/views/AttendanceConfirmationView.vue';
const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/attendance/form', name: 'attendance', component: Attendance },
    { path: '/attendance/card', name: 'attendanceCard', component: AttendanceCard },
    { path: '/attendance/confirmation', name: 'attendanceConfirm', component: AttendanceConfirm }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;
//# sourceMappingURL=index.js.map
