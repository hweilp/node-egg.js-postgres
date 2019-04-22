import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { join } from 'path';
export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1555669355398_6366';

  // add your egg config in here
  config.middleware = [];

  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.html',
    mapping: {
      '.html': 'nunjucks',
    },
    root: join(appInfo.baseDir, 'app/public'),
  },

    // config.redis = {
    //   client: {
    //     port: [ 9009 ],
    //     host: '127.0.0.1',
    //     password: [ 'root' ],
    //     db: 0,
    //   },
    // },

    // add DataBase
    // egg-sequelize pg pg-hstore
    config.sequelize = {
      dialect: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      database: 'cost_record',
      username: 'postgres',
      password: 'root',
    };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
