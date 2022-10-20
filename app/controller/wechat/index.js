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

    // console.log(1111);

  }

  // 获取access_token
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
    const res = await this.ctx.service.wechat.wechatAuth.getAuthUserInfo(code);
    if (res) {
      this.ctx.body = {
        data: res,
      };
    } else {
      this.ctx.body = '鉴权失败';
    }
  }

}
module.exports = wechatController;
