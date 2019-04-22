import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const user = await ctx.model.User.findAll();
    ctx.body = user;
  }
  /**
   * home
   */
  public async home() {
    await this.ctx.render('index', { title: 'egg-ts-postgres', name: '23' });
  }
}
