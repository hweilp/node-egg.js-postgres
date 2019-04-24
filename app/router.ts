import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const auth = middleware.authLogin({}, app);
  function routerGroup(middleware: any, callback: any, prefix: string = '') {
    const route = {
      get(path, callback) {
        router.get(prefix + path, ...middleware, callback);
      },
      post(path, callback) {
        router.post(prefix + path, ...middleware, callback);
      },
      put(path, callback) {
        router.put(prefix + path, ...middleware, callback);
      },
      delete(path, callback) {
        router.delete(prefix + path, ...middleware, callback);
      },
    };
    callback(route);
  }
  router.redirect('/', '/home', 302);
  router.get('/', controller.home.index);
  router.get('/home', controller.home.home);
  router.post('/login', controller.user.Login);
  router.get('/loginout', controller.user.Loginout);
  router.post('/register', controller.user.Register);
  routerGroup([ auth ], route => {
    route.get('/personal', controller.user.personal);
  });
};
