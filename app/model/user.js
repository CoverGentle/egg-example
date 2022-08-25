module.exports = app => {
  const { STRING } = app.Sequelize;
  // 默认情况下，sequlize将自动将所有传递的模型名称（define的第一个参数）转换为复数

  const User = app.model.define('user', {
    // 自动生成id
    username: STRING,
    password: STRING,
  });


  return User;
};
