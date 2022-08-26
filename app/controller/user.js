const Controller = require('egg').Controller;

class UserController extends Controller {
  // 登录
  async login() {
    const user = this.ctx.request.body;
    const userList = await this.ctx.service.user.getUserList(user.username);
    console.log(userList, 'userListuserList');
  }
  // 查询
  // async index() {
  //   const user = this.ctx.request.body;
  //   const userList = await this.ctx.service.user.getUserList(user.username);
  //   // console.log(userList, '12121212');
  //   if (userList) {
  //     this.ctx.body = {
  //       code: 200,
  //       data: userList,
  //       msg: '请求成功',
  //     };
  //   } else {
  //     this.ctx.body = {
  //       code: 400,
  //       data: null,
  //       msg: '请求失败',
  //     };
  //   }
  // }

  async create() {
    const userInfo = await this.ctx.service.user.register();
    if (userInfo) {
      this.ctx.body = {
        code: 200,
        msg: '注册成功',
      };
    }

  }
}

module.exports = UserController;
