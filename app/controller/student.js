const Controller = require('egg').Controller;

class StudentController extends Controller {

  // restful :index create destroy update
  // 查询
  async index() {
    const studentList = await this.ctx.service.student.getSrudentLit();
    if (studentList) {
      this.ctx.body = {
        code: 200,
        data: studentList,
        msg: '请求成功',
      };
    } else {
      this.ctx.body = {
        code: 400,
        data: null,
        msg: '请求失败',
      };
    }
  }

  // 创建
  async create() {
    const { ctx } = this;
    const name = ctx.request.body.name;
    const achievement = ctx.request.body.achievement;
    const grade_id = ctx.request.body.grade_id;
    await ctx.app.model.Student.create({
      name,
      achievement,
      grade_id,
    });
    ctx.body = '创建数据成功';
  }

  // 删除
  async destroy() {
    const { ctx } = this;
    ctx.body = '删除数据';
  }

  // 修改
  async update() {
    const { ctx } = this;
    ctx.body = '修改数据';
  }

}
module.exports = StudentController;
