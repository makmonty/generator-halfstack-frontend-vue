<template>
  <div>
    <app-nav></app-nav>
    <div class="container-fluid">
      <router-view class="view"></router-view>
    </div>
  </div>
</template>

<script>
import appNav from './app-nav.vue';

export default {
  components: {
    appNav
  },
  beforeMount() {
    this.$store.dispatch('start');
  }
};
</script>
