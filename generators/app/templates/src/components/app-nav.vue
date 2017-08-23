<template>
  <b-navbar toggleable type="inverse">
    <b-nav-toggle target="navbarSupportedContent"></b-nav-toggle>
    <b-link :to="{name: 'home'}" active-class="" exact-active-class="" class="navbar-brand">Navbar</b-link>
    <b-collapse is-nav id="navbarSupportedContent">
      <b-nav v-if="!me" is-nav-bar class="ml-auto">
        <b-nav-item :to="{name: 'login'}">
          Login
        </b-nav-item>
      </b-nav>
      <b-nav v-if="!!me" is-nav-bar class="ml-auto">
        <b-nav-item :to="{name: 'login'}" title="Profile">
          <icon name="user"></icon>
        </b-nav-item>
        <b-nav-item to="#" @click.prevent="logout" title="Logout">
          <icon name="sign-out"></icon>
        </b-nav-item>
      </b-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    me: {
      get() {
        return this.$store.state.me;
      }
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch('logout')
        .then(() => {
          this.$router.push({name: 'home'});
        });
    }
  }
};
</script>
