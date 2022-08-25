const Service = require('egg').Service;

class UserService extends Service {
  async getUserList() {
    // const user = this.ctx.request.body;
    try {
      const UserList = await this.app.model.User.findAll();
      console.log(UserList);
      return UserList;
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
