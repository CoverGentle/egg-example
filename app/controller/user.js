const Controller = require('egg').Controller;
const utility = require('utility');

class UserController extends Controller {
  // 登录
  async login() {
    const { username, password } = this.ctx.request.body;
    const passwordMd5 = utility.md5(password);
    const userAccount = {
      username,
      password: passwordMd5,
    };
    const userInfo = await this.ctx.service.user.getUserByName(username);
    if (!userInfo) {
      this.ctx.body = {
        code: 4000,
        msg: '用户名不存在',
      };
      return;
    }
    if (userInfo.username !== username || userInfo.password !== passwordMd5) {
      this.ctx.body = {
        code: 4001,
        msg: '用户名或密码不正确',
      };
      return;
    }
    if (userInfo && userInfo.password === passwordMd5) {
      const token = this.app.jwt.sign(userAccount, this.app.config.jwt.secret);
      this.ctx.body = {
        code: 2000,
        token,
        msg: '登录成功',
      };
      return;
    }
  }

  // 注册
  async register() {
    const { username, password } = this.ctx.request.body;
    const userInfo = await this.ctx.service.user.addUser(username, password);
    if (userInfo) {
      this.ctx.body = {
        code: 2000,
        msg: '注册成功',
      };
    } else {
      this.ctx.body = {
        code: 4000,
        msg: '注册失败',
      };
    }
  }

  // 获取用户列表
  async index() {
    const userList = await this.ctx.service.user.getUserList();
    if (userList) {
      this.ctx.body = {
        code: 200,
        userInfoList: userList,
        msg: '获取用户列表',
      };
    } else {
      this.ctx.body = {
        code: 400,
        userList: null,
        msg: '获取失败',
      };
    }
  }
}

module.exports = UserController;
