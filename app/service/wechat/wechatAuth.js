const Service = require('egg').Service;


// 获取到code后请求微信地址获取Auth鉴权用户信息
class AuthService extends Service {
  // 获取Auth的token
  async getAuthUserInfo(code) {
    try {
      const { appid, appsecret } = this.app.config.wechat;
      const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${appsecret}&code=${code}&grant_type=authorization_code`;
      const { data } = await this.ctx.app.curl(url, {
        method: 'post',
        rejectUnauthorized: false,
        dataType: 'json',
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // 获取微信个人信息
  async getWxUserInfo(ACCESS_TOKEN, OPENID) {
    try {
      const url = `https://api.weixin.qq.com/sns/userinfo?access_token=${ACCESS_TOKEN}&openid=${OPENID}&lang=zh_CN`;
      const { data } = await this.ctx.app.curl(url, {
        method: 'post',
        rejectUnauthorized: false,
        dataType: 'json',
      });
      const isHave = await this.app.model.WxUser.findOne({
        where: {
          openid: data.openid,
        },
      });
      if (isHave) {
        return isHave;
      }
      await this.app.model.WxUser.create({
        openid: data.openid,
        nickname: data.nickname,
        sex: data.sex,
        headimgurl: data.headimgurl,
      });
      return {
        openid: data.openid,
        nickname: data.nickname,
        sex: data.sex,
        headimgurl: data.headimgurl,
      };
    } catch (error) {
      console.log(error);
    }
  }

  // 获取基本信息
  async getUnionid(ACCESS_TOKEN, OPENID) {
    const url = `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${ACCESS_TOKEN}&openid=${OPENID}&lang=zh_CN`;

    const { data } = await this.ctx.app.curl(url, {
      method: 'get',
      rejectUnauthorized: false,
      dataType: 'json',
    });
    return data;


  }


}

module.exports = AuthService;
