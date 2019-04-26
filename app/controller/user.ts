import BaseController from './BaseController';
import { loginRules, registerRules, userEditRules } from '../utils/rules';
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

  /**
   * detail
   */
  public async detail() {
    const { id } = this.RequestQuery;
    if (!id) {
      return this.error('id不能为空', 2001);
    }
    const user = this.Model.User;
    const userDetail = await user.findOne({ where: { user_id: id } });
    if (userDetail && userDetail.dataValues) {
      const data = userDetail.dataValues;
      data.created_at = this.timeTurn(data.created_at);
      data.updated_at = this.timeTurn(data.updated_at);
      data.deleted_at = this.timeTurn(data.deleted_at);
      await this.ctx.render('user_detail', data);
    } else {
      await this.ctx.render('user_detail', {});
    }
  }

  /**
   * edit
   */
  public async edit() {
    const { userId, userName, userMobile } = this.RequestBody;
    const RequestBody = { userName, userMobile, userId };
    // reg
    const Rule = await this.validate(userEditRules, RequestBody);
    if (Rule) {
      return this.error(Rule.msg, 2001);
    }
    const user = this.Model.User;
    const HaveUserId = await user.findOne({ where: { user_id: userId } });
    if (!HaveUserId || !HaveUserId.dataValues) {
      return this.error('用户不存在', 2001);
    }
    const data = {
      user_name: userName,
      user_mobile: userMobile,
      updated_at: this.nowTime(),
    };
    const users = await user.update(data, { where: { user_id: userId } });
    if (users) {
      return this.successData({}, '修改成功');
    } else {
      return this.error('修改失败', 2001);
    }
  }

  /**
   * delete
   */
  public async delete() {
    const { id } = this.RequestBody;
    if (!id) {
      return this.error('id不能为空', 2001);
    }
    const user = this.Model.User;
    const result = await user.destroy({ where: { user_id: id } }, true);
    console.log(result, typeof result);
    if (result) return this.successData({}, '删除成功！');
    return this.error('删除失败');
  }

  public async personal() {
    const user = await this.Model.User.findAll();
    this.list(user);
  }
}
