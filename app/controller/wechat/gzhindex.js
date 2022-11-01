

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
  // 获取gzhaccess_token
  async getAccessToken() {
    const access = await this.ctx.service.wechat.wechatGetAccesToken.getAccessToken();
    this.ctx.body = {
      code: 2000,
      data: access,
      msg: '获取gzhaccess_token',
    };
  }


  // 请求接口获取jsapi_ticket配置jssdk
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

  // getjssdkInfo
  async getjssdkapiInfo() {
    const { url } = this.ctx.request.body;
    const result = await this.ctx.service.wechat.wechatService.getjssdkInfo(url);
    this.ctx.body = {
      data: result,
    };
  }
}

module.exports = gzhController;
