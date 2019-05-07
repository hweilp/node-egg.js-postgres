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

  router.get('/test', controller.home.test);
  // web
  router.redirect('/', '/home', 302);
  router.get('/', controller.home.index);
  router.get('/home', controller.home.home);
  router.get('/h5/activity', controller.h5.activity);

  // api
  router.post('/login', controller.user.Login);
  router.get('/loginout', controller.user.Loginout);
  router.post('/register', controller.user.Register);
  router.get('/vip_banner_list', controller.vip.getBannerList);
  routerGroup([ auth ], route => {
    route.get('/personal', controller.user.personal);
    router.get('/user/detail', controller.user.detail);
    router.put('/user/edit', controller.user.edit);
    router.delete('/user/delete', controller.user.delete);
  });
};
