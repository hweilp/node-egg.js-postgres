// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuthLogin from '../../../app/middleware/authLogin';

declare module 'egg' {
  interface IMiddleware {
    authLogin: typeof ExportAuthLogin;
  }
}
