import BaseController from './BaseController';
import { loginRules, registerRules } from '../utils/rules';
export default class UserController extends BaseController {
  /**
   * async login
   */
  public async Login() {
    const { userName, password } = this.RequestBody;
    const user = this.Model.User;
    const data = { userName, password };
    const Rule = await this.validate(loginRules, data);
    if (Rule) {
      return this.error(Rule.msg, 2001);
    }
    // 查询是否存在用户
    const UserMobile = await user.findAll({ user_mobile: userName });
    const UserName = await user.findAll({ where: { user_name: userName } });
    if (UserName.length > 0 || UserMobile.length > 0) {
      const UserPassword = await user.findAll({ where: { user_password: this.md5(password) } });
      if (UserPassword.length > 0) {
        this.setCookie('auth_token', this.randomStr(30, 'token'));
        // this.CTX.cookies.set('auth_token', this.randomStr(30, 'token'));
        return this.successData(data, '登录成功！');
      } else {
        return this.error('账户密码错误！', 2001);
      }
    } else {
      return this.error('账户不存在！', 2001);
    }
  }

  /**
   * loginout
   */
  public async Loginout() {
    // this.ctx.session.cpsTeller = null;
    this.clearCookie('auth_token');
    this.success('退出成功');
  }

  /**
   * register
   */
  public async Register() {
    const { userName, userMobile, password } = this.RequestBody;
    const RequestBody = { userName, userMobile, password };
    // reg
    const Rule = await this.validate(registerRules, RequestBody);
    if (Rule) {
      return this.error(Rule.msg, 2001);
    }
    // 检查 电话是否存在
    const user = this.Model.User;
    const isHaveMobile = await user.findAll({ where: { user_mobile: userMobile } });
    if (isHaveMobile.length > 0) {
      return this.error('电话号码已存在！', 2001);
    }
    const data = {
      user_name: userName,
      user_mobile: userMobile,
      user_password: this.md5(password),
      created_at: this.nowTime(),
    };
    const result = await user.create(data);
    if (result.dataValues) {
      return this.successData({}, '添加成功');
    } else {
      return this.error('添加失败', 2001);
    }
  }

  public async personal() {
    const user = await this.Model.User.findAll();
    this.list(user);
    // this.CTX.body = user;
  }
}
