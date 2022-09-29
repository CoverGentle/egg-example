// const user = require('../model/user');

const Service = require('egg').Service;
const utility = require('utility');
const common = require('../extend/common');
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
      // const getUserList = await this.app.model.User.findAll();
      const getUserList = await this.app.mysql.select('users');
      const getUserListPart = [];
      // eslint-disable-next-line array-callback-return
      getUserList.map(item => {
        getUserListPart.push({
          id: item.id,
          username: item.username,
          createdAt: common.formatTime(item.createdAt),
          updatedAt: common.formatTime(item.updatedAt),
        });
      });

      return getUserListPart;
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
