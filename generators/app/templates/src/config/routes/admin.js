export default {
  path: '/admin',
  component: require('@/components/admin/layout.vue').default,
  children: [
    {
      name: 'admin-dashboard',
      path: '',
      component: require('@/components/admin/dashboard.vue').default
    }
  ]
};
