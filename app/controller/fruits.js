'use strict';

const Controller = require('egg').Controller;

const fruits = [ '香蕉', '苹果', '西瓜' ];
class FruitsController extends Controller {
  async index() {
    const { ctx } = this;
    // const query = ctx.request.query;
    // ctx.body = `传递的index的值是${query.index}`;
    ctx.body = fruits;
  }

  async create() {
    const { ctx } = this;
    const fruit = ctx.request.body;
    fruits.push(fruit.fruitName);
    // ctx.body = fruits;
    // 添加成功之后重定向到列表页
    // ctx.redirect('/fruits');
  }
}

module.exports = FruitsController;
