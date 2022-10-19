const Service = require('egg').Service;


// 获取到code后请求微信地址获取Auth鉴权用户信息
class AuthService extends Service {
  async getAuthUserInfo(code) {
    // let authUserInfo = this.ctx.
    const { appid, appsecret } = this.app.config.wechat;
    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${appsecret}&code=${code}&grant_type=authorization_code`;
    const { data } = await this.ctx.app.curl(url, {
      method: 'get',
      rejectUnauthorized: false,
      dataType: 'json',
    });
    return data;
  }

}

module.exports = AuthService;
