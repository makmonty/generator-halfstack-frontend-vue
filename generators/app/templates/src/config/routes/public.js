export default {
  path: '/',
  component: require('@/components/layout.vue').default,
  children: [
    {
      name: 'home',
      path: '',
      component: require('@/components/home.vue').default
    }, <% if (userSystem) { %>{
      name: 'login',
      path: '/login',
      component: require('@/components/login.vue').default
    }, <% } %>{
      name: '404',
      path: '/*',
      component: require('@/components/404.vue').default
    }
  ]
};
