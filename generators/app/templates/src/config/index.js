import routes from './routes';

export default {
  routes<% if (useApi) { %>,
  backendBaseUrl: '<%= backendBaseUrl %>',
  apiPath: '<%= apiPath %>'<% } %>
};
