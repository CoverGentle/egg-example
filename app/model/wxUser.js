module.exports = app => {
  const { STRING } = app.Sequelize;

  const WxUser = app.model.define('wxUser', {
    // 自动生成id
    openid: STRING,
    nickname: STRING,
    sex: STRING,
    headimgurl: STRING,
  });
  return WxUser;
};
