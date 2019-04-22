const userInfoModel = {
  filedName: {
    id: {
      type: 'int',
      notNull: true,
      // autoIncrement: true,
      comment: '序号',
    },
    user_id: {
      type: 'int',
      notNull: true,
      primaryKey: true,
      comment: '用户ID',
    },
    user_name: {
      type: 'string',
      length: 100,
      comment: '昵称',
    },
    user_real: {
      type: 'string',
      length: 100,
      comment: '真实姓名',
    },
    user_password: {
      type: 'string',
      length: 100,
      comment: '用户密码',
    },
    user_mobile: {
      type: 'string',
      length: 100,
      comment: '电话',
    },
    user_avatar: {
      type: 'string',
      notNull: true,
      length: 128,
      comment: '头像',
    },
    user_type: {
      type: 'smallint',
      notNull: true,
      defaultValue: 10,
      comment: '用户类型',
    },
    user_status: {
      type: 'smallint',
      notNull: true,
      defaultValue: 1,
      comment: '状态 0:异常   1：正常',
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      comment: '注册时间',
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      comment: '更新时间',
    },
    delete_at: {
      type: 'timestamp',
      notNull: true,
      comment: '删除时间',
    },
  },
  up: (db, callback) => {
    db.createTable('user_info', userInfoModel.filedName, callback);
  },
  down: (db, callback) => {
    db.dropTable('user_info', callback);
  },
  _meta: {
    version: 1,
  },
};

export default userInfoModel;
