import BaseController from './BaseController';
export default class VipController extends BaseController {
  /**
   * activity
   */
  public async activity() {
    await this.ctx.render('h5/activity', { title: 'egg-ts-postgres', name: '23' });
  }
}
