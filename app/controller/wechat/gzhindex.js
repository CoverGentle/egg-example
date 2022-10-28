

const Controller = require('egg').Controller;

class gzhController extends Controller {
  // 微信配置接口域名的时候，需要有验证地方
  async check() {
    try {
      const res = await this.ctx.service.wechat.wechatService.check();
      if (res) {
        this.ctx.body = res;
        console.log(res);
      } else {
        this.ctx.body = {
          data: {
            msg: '请求失败',
          },
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 获取公众号验证的access_token
  async getEverToken() {
    try {
      const result = await this.ctx.service.wechat.wechatGetAccesToken.getEverToken();
      this.ctx.body = {
        data: result,
      };
      console.log(result, 'result');
    } catch (error) {
      console.log(error);
    }
  }

  // 请求接口获取jsapi_ticket
  async getTicket() {
    const result = await this.ctx.service.wechat.wechatService.getJsApiTicket();
    if (result) {
      this.ctx.body = result;
      console.log(result);
    } else {
      this.ctx.body = {
        data: {
          msg: '请求失败',
        },
      };
    }
  }

  // 获取jssdk的配置数据
  async getJssdkConfig() {
    const result = await this.ctx.service.wechat.wechatService.getJsApiTicket();
    if (result.errcode === 40001) {
      console.log('公众号token过期', result);
    }
    this.ctx.body = {
      data: result,
    };
  }
}

module.exports = gzhController;
