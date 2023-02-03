// Routes
const { API_PREFIX } = require('config');
const { AuthRoutes } = require('../components/Auth/auth.module');
const { CreateRoutes } = require('../components/todo/create.module')
const routes = [
  {
    path: '/auth',
    route: AuthRoutes,
    route: CreateRoutes
  }
];

module.exports = (app) => {
  routes.forEach((route) => {
    app.use(route.path, route.route);
  });
};
