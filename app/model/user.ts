import UserModel from '../../migrations/201904220000001-user-info';
module.exports = app => {
  const UserInfo = app.model.define('user_info', UserModel.filedName,
    {
      freezeTableName: true, // Model 对应的表名将与model名相同
      tableName: 'user_info',
      timestamps: false,
    });
  return UserInfo;
};
