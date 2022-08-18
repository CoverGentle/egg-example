'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = '<h1>hello,world</h1>';
    await ctx.render('index', { fruits: [ '香蕉', '苹果', '奋力' ] });
  }

  async getData() {
    const { ctx } = this;
    ctx.body = 'hi,egg';
  }
}

module.exports = HomeController;
