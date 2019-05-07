// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaseController from '../../../app/controller/BaseController';
import ExportH5 from '../../../app/controller/h5';
import ExportHome from '../../../app/controller/home';
import ExportUser from '../../../app/controller/user';
import ExportVip from '../../../app/controller/vip';

declare module 'egg' {
  interface IController {
    baseController: ExportBaseController;
    h5: ExportH5;
    home: ExportHome;
    user: ExportUser;
    vip: ExportVip;
  }
}
