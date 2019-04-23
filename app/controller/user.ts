// import { Controller } from 'egg';
import BaseController from './BaseController';
export default class PersoanlController extends BaseController {
  /**
   * async login
   */
  public async Login() {
    const { ctx } = this;
    const { userName, password } = ctx.request.body;
    const user = ctx.model.User;

    const data = { userName, password };
    // const query = { user_mobile: phone, user_password: password };
    // 查询是否存在用户
    const UserMobile = await user.findAll({ where: { user_mobile: userName } });
    const UserName = await user.findAll({ where: { user_name: userName } });
    if (UserName.length > 0 || UserMobile > 0) {
      const UserPassword = await user.findAll({ where: { user_password: password } });
      if (UserPassword.length > 0) {
        this.successData(data, '登录成功！');
      } else {
        this.error('密码错误！', 2001);
      }
    } else {
      this.error('用户不存在！', 2001);
    }
  }

  public async personal() {
    const { ctx } = this;
    const user = await ctx.model.User.findAll();
    ctx.body = user;
  }
}
