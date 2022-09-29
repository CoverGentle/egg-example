const Controller = require('egg').Controller;

class wechatController extends Controller {
  // 微信配置接口域名的时候，需要有验证地方
  async check() {
    const echostr = this.ctx.service.wechat.wechatService.check();
    console.log(echostr, 'echostr');
    if (echostr) {
      this.ctx.body = {
        echostr,
      };
    } else {
      this.ctx.body = 'Fail';
    }
    // console.log(1111);

  }

  // 获取access_token
  async getAccessTokenInfo() {
    const accessToken = this.ctx.service.wechat.accessToken.getAccessTokenInfo();
    this.ctx.body = {
      accessToken,
    };
    console.log(accessToken, 'accessToken');
  }

  //

}
module.exports = wechatController;
