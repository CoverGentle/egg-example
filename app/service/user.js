// const user = require('../model/user');

const Service = require('egg').Service;
const utility = require('utility');
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

  // 注册
  async addUser(username, password) {
    try {
      const passwordMd5 = utility.md5(password);
      const userInfo = this.app.model.User.create({
        username,
        password: passwordMd5,
      });
      return userInfo;
    } catch (error) {
      return null;
    }
  }
}

module.exports = UserService;
