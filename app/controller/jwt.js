const Controller = require('egg').Controller;
class JwtController extends Controller {
  async doLogin() {
    const user = this.ctx.request.body;
    if (user.username === 'admin' && user.password === '123456') {
      // const user_jwt = { username: user.username };
      const token = this.app.jwt.sign(user, this.app.config.jwt.secret);
      this.ctx.body = {
        code: 200,
        token,
        msg: '登录成功',
      };
    } else {
      this.ctx.body = {
        code: 400,
        token: '获取token失败',
        msg: '用户名或密码错误',
      };
    }
  }

  async getMessage() {
    const { ctx } = this;
    ctx.body = {
      code: 200,
      msg: '请求成功',
    };
  }


  async index() {
    const userInfo = {
      username: 'shuaibo',
      password: '123456',
    };
    const { ctx } = this;
    // ctx.body = 'hello jwt';
    // egg-jwt
    // 用户登录
    const token = this.app.jwt.sign(userInfo, this.app.config.jwt.secret);
    try {
      const decode = this.app.jwt.verify(token, this.app.config.jwt.secret);
      ctx.body = decode;
    } catch (error) {
      ctx.body = 'token未能通过验证';
    }
  }
}
module.exports = JwtController;
