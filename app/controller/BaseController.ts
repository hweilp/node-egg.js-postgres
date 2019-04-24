import { Controller } from 'egg';
import * as crypto from 'crypto';
import * as moment from 'moment';
export default class BaselController extends Controller {
  public Moment: any;
  public CTX: any;
  public Model: any;
  public Service: any;
  public RequestBody: any;
  public SeesionConfig: any;
  constructor(app) {
    super(app);
    this.Moment = moment;
    this.CTX = this.ctx;
    this.Model = this.ctx.model;
    this.RequestBody = this.ctx.request.body;
    this.Service = this.ctx.service;
    this.SeesionConfig = this.config.session;
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
    this.NormalResponse({}, 2000, msg);
  }

  error(msg: string, code: number) {
    this.NormalResponse({}, code || 4000, msg);
  }

  nowTime() {
    return this.Moment().format();
  }

  /**
   * md5 加密
   */
  md5(str: string, salt?: any) {
    salt = salt || '';
    const md5sum = crypto.createHash('md5');
    return md5sum.update(str + salt).digest('hex');
  }

  /**
   * validate 参数校验
   */
  public async validate(rule?: any, data?: any) {
    for (const item in rule) {
      const RuleItem = rule[item];
      const DataItem = data[item];
      if (RuleItem.required) {
        if (!DataItem || DataItem === '') {
          return RuleItem;
        }
      }
      if (RuleItem.min) {
        if (!DataItem || DataItem.length < RuleItem.min) {
          return RuleItem;
        }
      }
      if (RuleItem.max) {
        if (!DataItem || DataItem.length > RuleItem.max) {
          return RuleItem;
        }
      }
      if (RuleItem.reg) {
        if (!RuleItem.reg.test(DataItem)) {
          RuleItem.msg = RuleItem.regMsg;
          return RuleItem;
        }
      }
    }
    return null;
  }

  /**
   * 随机生成唯一值
   */
  public randomStr(length: number, res: string) {
    res = res || '';
    res += '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.ceil(Math.random() * 61)];
    if (res.length < length) {
      return this.randomStr(length, res);
    } else {
      return res;
    }
  }

  /**
   * setCookie
   */
  public setCookie(key: string, value: string) {
    // const { maxAge, httpOnly, encrypt } = this.SeesionConfig;
    // const cookieConfig = { maxAge, httpOnly, encrypt };
    // console.log('setCookie', this.SeesionConfig, maxAge);
    this.ctx.cookies.set(key, value);
  }

  /**
   * getCookie
   */
  public async getCookie(key: string) {
    return await this.ctx.cookies.get(key, {
      encrypt: true,
    });
  }

  /**
   * clearCookie
   */
  public clearCookie(key: string) {
    this.ctx.cookies.set(key, '', {
      maxAge: 0,
    });
  }

  /**
   * setSession
   */
  public setSession(key: string, value: any) {
    this.ctx.session[key] = value;
  }

  /**
   * getSession
   */
  public getSession(key: string) {
    return this.ctx.session[key] || null;
  }
}
