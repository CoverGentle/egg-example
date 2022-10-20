const Service = require('egg').Service;


// 获取到code后请求微信地址获取Auth鉴权用户信息
class AuthService extends Service {
  // 获取Auth的token
  async getAuthUserInfo(code) {
    const { appid, appsecret } = this.app.config.wechat;
    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${appsecret}&code=${code}&grant_type=authorization_code`;
    const { data } = await this.ctx.app.curl(url, {
      method: 'post',
      rejectUnauthorized: false,
      dataType: 'json',
    });
    return data;
    // if (resData) {
    //   const url = `https://api.weixin.qq.com/sns/userinfo?access_token=${resData.access_token}&openid=${resData.openid}&lang=zh_CN`;
    //   await this.ctx.app.curl(url, {
    //     method: 'post',
    //     rejectUnauthorized: false,
    //     dataType: 'json',
    //   }).then(res => {
    //     console.log(res, 'res');
    //     return res;
    //   });

    // }
  }

}

module.exports = AuthService;
