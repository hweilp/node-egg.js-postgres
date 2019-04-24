import { Service } from 'egg';

export default class User extends Service {
  public User: any;
  constructor(app) {
    super(app);
    this.User = this.app.model.User;
  }
  /**
   * login
   */
  public login() {
    //
  }
  /**
   * $query
   */
  public async $query(data?: any) {
    if (data) {
      return await this.User.findAll({ where: data });
    } else {
      return await this.User.findAll();
    }
  }

  /**
   * $insert
   */
  public async $insert(data) {
    return await this.User.create(data);
  }
}
