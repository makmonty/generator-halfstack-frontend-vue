<template>
  <div>
    <div class="row justify-content-center">
      <b-form class="col-sm-6 my-4" @submit.prevent="login">
        <div class="form-group">
          <label for="name">User</label>
          <input
            id="username"
            type="text"
            class="form-control"
            v-model="username" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            class="form-control"
            v-model="password" />
        </div>

        <b-button type="submit" variant="primary">Login</b-button>
        <b-button @click="signUp" variant="default">Sign up</b-button>

        <b-alert variant="danger"
          dismissible
          :show="!!error">
          {{error}}
        </b-alert>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch('login', {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push({name: 'home'});
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.error = 'Wrong username or password';
          }
        });
    },
    signUp() {
      this.$store
        .dispatch('signUp', {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push({name: 'home'});
        })
        .catch((err) => {
          if (err.response.status === 409) {
            this.error = 'User already exists';
          }
        });
    }
  }
};
</script>
