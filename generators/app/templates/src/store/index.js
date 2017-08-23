import me from '@/services/me';

export default {
  state: {
    me: null
  },
  mutations: {
    setUser(state, {user}) {
      state.me = user;
    },
    removeUser(state) {
      state.me = null;
    }
  },
  actions: {
    start(context) {
      return me
        .get()
        .then((user) => {
          context.commit('setUser', {user});
          return user;
        });
    },
    login(context, {username, password}) {
      return me
        .login(username, password)
        .then((user) => {
          context.commit('setUser', {user});
          return user;
        });
    },
    logout(context) {
      return me
        .logout()
        .then(() => {
          context.commit('removeUser');
        });
    },
    signUp(context, {username, password}) {
      return me
        .signUp(username, password)
        .then((user) => {
          context.commit('setUser', {user});
          return user;
        });
    }
  }
};
