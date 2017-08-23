import adminRoutes from './admin';
import publicRoutes from './public';

export default {
  mode: 'history',
  base: '/',
  linkExactActiveClass: 'active',
  routes: [adminRoutes, publicRoutes]
};
