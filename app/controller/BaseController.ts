import { Controller } from 'egg';

export default class BaselController extends Controller {
  constructor(app) {
    super(app);
  }

  // 正常响应返回
  NormalResponse(data: any, code?: number, msg?: string) {
    this.ctx.body = {
      code: code || 2000,
      data: data || {},
      msg: msg || '',
    };
  }

  // 集合响应返回
  list(data: any) {
    this.NormalResponse({ list: data || [] });
  }

  successData(data: any, msg: string) {
    this.NormalResponse(data, 2000, msg);
  }

  success(msg) {
    this.NormalResponse({}, msg);
  }

  error(msg: string, code: number) {
    this.NormalResponse({}, code || 4000, msg);
  }

  // md5(str, salt) {
  //   salt = salt || '';
  //   const md5sum = crypt.createHash('md5');
  //   return md5sum.update(str + salt).digest('hex');
  // }

  async validate(rule?: any, data?: any) {
    console.log(rule, data);
    // await this.validator.check(rule, data);
    // if (!this.validator.valid) {
    //   this.error(this.validator.msg[0]);
    //   return false;
    // }
    return true;
  }
}
