import api from '@/services/api';
import UserResource from '@/api-resources/user.resource';

var promise = null;

export default {
  get() {
    if (promise) {
      return promise;
    }
    promise = api
      .get('/user/me')
      .then((response) => {
        return response.data ? new UserResource(response.data) : null;
      });

    return promise;
  },

  login(username, password) {
    promise = api
      .post('/user/login', {
        username,
        password
      })
      .then((response) => {
        return new UserResource(response.data);
      });
    return promise;
  },

  logout() {
    promise = null;
    return api.post('/user/logout');
  },

  signUp(username, password) {
    var user = new UserResource({
      username,
      password
    });
    promise = user.save();
    return promise;
  }
};
