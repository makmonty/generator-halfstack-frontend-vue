<style lang="scss">

$nav-bg-color: #2e3d4d;

@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

body {
  font-family: 'Lato';
}

nav {
  background-color: $nav-bg-color;

  .navbar-brand {
    color: white;
  }

  a {
    color: white;
  }

  .active {
    background-color: lighten($nav-bg-color, 20%);
  }
}

</style>

<template>
  <router-view></router-view>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import 'vue-awesome/icons';
import FAComponent from 'vue-awesome/components/Icon.vue';
import BootstrapVue from 'bootstrap-vue';

import routes from '@/config/routes';
<% if (userSystem) { %>
import store from '@/store';
<% } %>
Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.use(VueRouter);

Vue.component('icon', FAComponent);

export default {
  el: '#app',
  router: new VueRouter(routes)<% if (userSystem) { %>,
  store: new Vuex.Store(store)<% } %>
};
</script>
