const Subscription = require('egg').Subscription;

class UpdateJsapiTicket extends Subscription {
  static get schedule() {
    return {
      interval: '7000s',
      type: 'all',
      immediate: true,
      disable: false,
    };
  }

  async subscribe() {
    const res = await this.ctx.service.wechat.wechatService.getJsApiTicket();
    console.log(res, 'UpdateJsapiTicket');
  }

}

module.exports = UpdateJsapiTicket;
