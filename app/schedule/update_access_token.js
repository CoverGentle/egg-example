
const Subscription = require('egg').Subscription;

class UpdateAccessToken extends Subscription {
  static get schedule() {
    return {
      interval: '7000s',
      type: 'all',
      immediate: true,
      disable: false,
    };
  }

  async subscribe() {
    const res = await this.ctx.service.wechat.wechatGetAccesToken.getAccessToken();
    console.log(res, 'subscribe---res');

  }
}

module.exports = UpdateAccessToken;
