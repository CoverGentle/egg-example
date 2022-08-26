// const user = require('../model/user');

const Service = require('egg').Service;

class UserService extends Service {
  async getUserList(userInfo) {
    try {
      const UserList = await this.app.model.User.findAll(
        { where: {
          username: userInfo,
        } }
      );
      if (UserList) {
        const token = this.app.jwt.sign(userInfo, this.app.config.jwt.secret);
        this.ctx.body = {
          code: 2000,
          token,
          msg: '登录成功',
        };
        return UserList;
      }
    } catch (error) {
      return null;
    }
  }

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
