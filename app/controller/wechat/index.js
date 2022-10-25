const Controller = require('egg').Controller;

class wechatController extends Controller {
  // 微信配置接口域名的时候，需要有验证地方
  async check() {
    const res = await this.ctx.service.wechat.wechatService.check();
    if (res) {
      this.ctx.body = res;
      console.log(res);
    } else {
      this.ctx.body = 'Fail';
    }

  }

  // 获取公众号验证的access_token
  async getAccessTokenInfo() {
    const accessToken = await this.ctx.service.wechat.wechatGetAccesToken.getAccessToken();
    this.ctx.body = {
      accessToken,
    };
    console.log(accessToken, 'accessToken');
  }

  // 获取到code后请求微信地址获取Auth鉴权用户信息
  async getAuthUser() {
    const { code } = this.ctx.request.body;
    console.log(code);
    const { access_token, expires_in, refresh_token, openid, scope } = await this.ctx.service.wechat.wechatAuth.getAuthUserInfo(code);
    console.log(access_token, 'access_token');
    this.ctx.service.redis.set('access_token', access_token, 7000);
    this.ctx.service.redis.set('openid', openid);
    this.ctx.service.redis.set('expires_in', expires_in);
    if (access_token) {
      this.ctx.body = {
        data: {
          access_token,
          expires_in,
          refresh_token,
          openid,
          scope,
        },
      };
    } else {
      this.ctx.body = '鉴权失败';
    }
  }

  // 获取微信个人信息
  async getWxUserInfo() {
    const access = await this.ctx.service.redis.get('access_token');
    const openid = await this.ctx.service.redis.get('openid');
    const result = await this.ctx.service.wechat.wechatAuth.getWxUserInfo(access, openid);
    if (result) {
      this.ctx.body = {
        data: {
          opneid: result.openid,
          nickname: result.nickname,
          sex: result.sex,
          headimgurl: result.headimgurl,
        },
      };
    } else {
      this.ctx.body = '请求失败';
    }
  }
}


module.exports = wechatController;
