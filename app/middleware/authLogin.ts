module.exports = () => {
  return async function isAuth(ctx, next) {
    let token: string;
    token = ctx.cookies.get('auth_token');
    if (token) {
      return await next();
    }
    ctx.body = {
      code: 4010,
      data: {},
      msg: '未登录',
    };
  };
};
