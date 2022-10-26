module.exports = app => {
  const { STRING } = app.Sequelize;
  // 默认情况下，sequlize将自动将所有传递的模型名称（define的第一个参数）转换为复数

  const City = app.model.define('city', {
    // 自动生成id
    cityName: STRING,
    cityNumber: STRING,
  });


  return City;
};
