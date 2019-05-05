module.exports = () => {
  return async function isAuth(ctx, next) {
    let token: string;
    // console.log(ctx.header.auth_token);
    token = ctx.header.auth_token || ctx.cookies.get('auth_token');
    // console.log(token);
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
