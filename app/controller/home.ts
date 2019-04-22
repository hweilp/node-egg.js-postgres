import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const user = await ctx.model.User.findAll();
    ctx.body = user;
  }
}
