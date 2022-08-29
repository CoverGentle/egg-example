// const user = require('../model/user');

const Service = require('egg').Service;

class UserService extends Service {

  // 通过用户名获取用户信息既登录
  async getUserByName(username) {
    try {
      const result = await this.app.model.User.findOne({
        where: {
          username,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // 获取用户列表
  async getUserList() {
    try {
      const getUserList = await this.app.model.User.findAll();
      return getUserList;
    } catch (error) {
      return error;
    }
  }


  // 获取用户个人信息
  // async getUserInfo() {

  // }

  // 注册
  async register() {
    const user = this.ctx.request.body;
    const userInfo = this.app.model.User.create({
      username: user.username,
      password: user.password,
    });
    return userInfo;
  }
}

module.exports = UserService;
