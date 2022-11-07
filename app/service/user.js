// const user = require('../model/user');

const Service = require('egg').Service;
const utility = require('utility');
const helper = require('../extend/helper');
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
      // const getUserList = await this.app.mysql.select('users');
      const getUserListPart = [];
      // eslint-disable-next-line array-callback-return
      getUserList.map(item => {
        getUserListPart.push({
          id: item.id,
          username: item.username,
          createdAt: helper.formatTime(item.createdAt),
          updatedAt: helper.formatTime(item.updatedAt),
        });
      });

      return getUserListPart;
    } catch (error) {
      return error;
    }
  }

  // 删除用户
  async deleteUserInfo(id) {
    try {
      const user = await this.app.model.User.destroy(
        {
          where: {
            id,
          },
        }
      );
      return user;
    } catch (error) {
      return error;
    }
  }

  // 注册
  async addUser(username, password) {
    try {
      const isUser = await this.app.model.User.findOne({
        where: {
          username,
        },
      });
      console.log(isUser, 'isUser');
      if (isUser) {
        return 1;
      }

      const passwordMd5 = utility.md5(password);
      await this.app.model.User.create({
        username,
        password: passwordMd5,
      });
      return 2;
    } catch (error) {
      return null;
    }
  }
}

module.exports = UserService;
