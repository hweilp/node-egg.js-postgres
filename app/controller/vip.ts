import BaseController from './BaseController';
// import { loginRules, registerRules, userEditRules } from '../utils/rules';
export default class VipController extends BaseController {
  /**
   * getBannerList
   */
  public async getBannerList() {
    const { type } = this.RequestBody;
    console.log(type);
    const data = {
      page: 1,
      size: 5,
      list: [
        {
          url: 'http://127.0.0.1:8080/static/images/vip1.jpg',
          id: 10001,
          href: 'http://127.0.0.1:8080/h5/activity',
        },
        {
          url: 'http://127.0.0.1:8080/static/images/vip2.jpg',
          id: 10002,
          href: 'http://127.0.0.1:8080/h5/activity',
        },
        {
          url: 'http://127.0.0.1:8080/static/images/vip3.jpg',
          id: 10003,
          href: 'http://127.0.0.1:8080/h5/activity',
        },
      ],
    };
    this.successData(data, '成功');
  }
}
