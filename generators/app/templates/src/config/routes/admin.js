import AdminLayout from '@/components/admin/layout.vue';
import AdminDashboard from '@/components/admin/dashboard.vue';

export default {
  path: '/admin',
  component: AdminLayout,
  children: [
    {
      name: 'admin-dashboard',
      path: '',
      component: AdminDashboard
    }
  ]
};
