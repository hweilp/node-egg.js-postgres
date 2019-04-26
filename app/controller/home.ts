import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    await ctx.render('index', { title: 'egg-ts-postgres', name: '23' });
  }
  /**
   * home
   */
  public async home() {
    await this.ctx.render('index', { title: 'egg-ts-postgres', name: '23' });
  }
}
