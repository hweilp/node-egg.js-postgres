import UserModel from '../../migrations/201904220000001-user-info';
module.exports = app => {
  const UserInfo = app.model.define('user_info', UserModel.filedName,
    {
      freezeTableName: true,
      tableName: 'user_info',
      timestamps: false,
    });
  return UserInfo;
};
