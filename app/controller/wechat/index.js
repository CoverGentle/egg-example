const Controller = require('egg').Controller;

class wechatController extends Controller {
  async check() {
    const echostr = this.ctx.service.wechat.wechatService.check();
    this.ctx.body = {
      echostr,
    };
    console.log(echostr, 'echostr');
  }

}
module.exports = wechatController;
