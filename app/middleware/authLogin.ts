module.exports = () => {
  return async function isAuth(ctx, next) {
    let token: string;
    console.log(ctx);
    token = ctx.cookies.get('token');
    const loginMobile = ctx.session.login_mobile_str;
    if (token && loginMobile) {
      return await next();
    }
    ctx.body = {
      code: 4010,
      data: {},
      msg: '未登录',
    };
  };
};
