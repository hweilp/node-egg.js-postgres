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

  /**
   * test
   */
  public test() {
    console.log('2323');
    const query = this.ctx.query;
    console.log('query', query);
    const code = 2000;
    const data = {
      name: 'this is test',
    };
    const msg = '成功';
    this.ctx.body = {
      code: code || 2000,
      data: data || {},
      msg: msg || '',
    };
  }
}
