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
    const rules = {
      userName: {
        type: 'string',
        required: true,
        msg: '请输入登录名',
      },
      password: {
        type: 'string',
        required: true,
        reg: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
        regMsg: '登陆密码格式不正确,包含大小写字母并且长度在6~15之间的密码组合,可使用特殊字符',
        msg: '请输入登陆密码',
      },
    };
    const Rule = await this.validate(rules, data);
    if (Rule) {
      return this.error(Rule.msg, 2001);
    }

    const UserMobile = await user.findAll({ where: { user_mobile: userName } });
    const UserName = await user.findAll({ where: { user_name: userName } });
    if (UserName.length > 0 || UserMobile > 0) {
      const UserPassword = await user.findAll({ where: { user_password: this.md5(password) } });
      if (UserPassword.length > 0) {
        return this.successData(data, '登录成功！');
      } else {
        return this.error('账户密码错误！', 2001);
      }
    } else {
      return this.error('账户不存在！', 2001);
    }
  }

  /**
   * register
   */
  public async Register() {
    const { ctx } = this;
    const { userName, userMobile, password } = ctx.request.body;
    // const new
    // this.md5(password))
    const data = { user_name: userName, user_mobile: userMobile, user_password: this.md5(password), created_at: this.nowTime() };
    const user = ctx.model.User;
    // reg
    // 检查 电话是否存在
    const isHaveMobile = await user.findAll({ where: { user_mobile: userMobile } });
    if (isHaveMobile.length > 0) {
      return this.error('电话号码已存在！', 2001);
    }
    const result = await user.create(data);
    if (result.dataValues) {
      return this.successData({}, '添加成功');
    } else {
      return this.error('添加失败', 2001);
    }
  }

  public async personal() {
    const { ctx } = this;
    const user = await ctx.model.User.findAll();
    ctx.body = user;
  }
}
