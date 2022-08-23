module.exports = app => {
  const { STRING, DOUBLE } = app.Sequelize;
  // 默认情况下，sequlize将自动将所有传递的模型名称（define的第一个参数）转换为复数

  const Student = app.model.define('student', {
    // 自动生成id
    name: STRING,
    achievement: DOUBLE,
  });

  Student.associate = function() { // 所属哪个班级,指向班级的主键
    app.model.Student.belongsTo(app.model.Grade, {
      foreignKey: 'grade_id',
      as: 'grade',
    });
  };

  return Student;
};
