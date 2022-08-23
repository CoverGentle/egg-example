const Controller = require('egg').Controller;

class GradeController extends Controller {

  // restful :index create destroy update
  // 查询
  async index() {
    const { ctx } = this;
    // const id = ctx.request.query.id; // http://127.0.0.1:7001/grade?id=3
    const gradeList = await ctx.app.model.Grade.findAll();
    // {
    //   where: { id },
    // }
    ctx.body = gradeList;
  }

  // 创建
  async create() {
    const { ctx } = this;
    const name = ctx.request.body.name;
    await ctx.app.model.Grade.create({
      name,
    });
    ctx.body = '创建成功';
  }

  // 删除
  async destroy() {
    const { ctx } = this;
    ctx.body = '删除数据';
  }

  // 修改
  async update() {
    const name = this.ctx.request.body.name;
    const id = this.ctx.params.id; // http://127.0.0.1:7001/grade/12
    this.app.model.Grade.update({
      name,
    },
    {
      where: {
        id,
      },
    });
    this.ctx.body = '修改成功';
  }

}
module.exports = GradeController;
