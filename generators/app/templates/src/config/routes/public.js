import Layout from '@/components/layout.vue';
import Home from '@/components/home.vue';
import Login from '@/components/login.vue';
import Error404 from '@/components/404.vue';

export default {
  path: '/',
  component: Layout,
  children: [
    {
      name: 'home',
      path: '',
      component: Home
    }, <% if (userSystem) { %>{
      name: 'login',
      path: '/login',
      component: Login
    }, <% } %>{
      name: '404',
      path: '/*',
      component: Error404
    }
  ]
};
