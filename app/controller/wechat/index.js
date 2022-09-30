const Controller = require('egg').Controller;

class wechatController extends Controller {
  // 微信配置接口域名的时候，需要有验证地方
  async check() {
    const res = await this.ctx.service.wechat.wechatService.check();
    if (res) {
      this.ctx.body = res;
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

  //

}
module.exports = wechatController;
