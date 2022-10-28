const Controller = require('egg').Controller;

class wechatController extends Controller {
  // // 微信配置接口域名的时候，需要有验证地方
  // async check() {
  //   try {
  //     const res = await this.ctx.service.wechat.wechatService.check();
  //     if (res) {
  //       this.ctx.body = res;
  //       console.log(res);
  //     } else {
  //       this.ctx.body = {
  //         data: {
  //           msg: '请求失败',
  //         },
  //       };
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // // 请求接口获取jsapi_ticket
  // async getTicket() {
  //   const result = await this.ctx.service.wechat.wechatService.getJsApiTicket();
  //   if (result) {
  //     this.ctx.body = result;
  //     console.log(result);
  //   } else {
  //     this.ctx.body = {
  //       data: {
  //         msg: '请求失败',
  //       },
  //     };
  //   }
  // }

  // // 获取jssdk的配置数据
  // async getJssdkConfig() {
  //   const result = await this.ctx.service.wechat.wechatService.getJsApiTicket();
  //   if (result.errcode === 40001) {
  //     console.log('公众号token过期', result);
  //   }
  //   this.ctx.body = {
  //     data: result,
  //   };
  // }

  // // 获取公众号验证的access_token
  // async getEverToken() {
  //   try {
  //     const result = await this.ctx.service.wechat.wechatGetAccesToken.getEverToken();
  //     this.ctx.body = {
  //       data: result,
  //     };
  //     console.log(result, 'result');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // 获取到code后请求微信地址获取Auth鉴权用户信息
  async getAuthUser() {
    try {
      const { code } = this.ctx.request.body;
      console.log(code);
      const { access_token, expires_in, refresh_token, openid, scope } = await this.ctx.service.wechat.wechatAuth.getAuthUserInfo(code);
      console.log(access_token, 'access_token');
      this.ctx.service.redis.set('access_token', access_token, expires_in);
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
    } catch (error) {
      console.log(error);
    }
  }

  // 获取微信个人信息
  async getWxUserInfo() {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  // 获取用户列表
  async getwxUserListInfo() {
    const result = await this.ctx.service.wechat.wxUser.getwxUserList();
    if (result) {
      this.ctx.body = {
        code: 2000,
        data: result,
        msg: '获取用户列表',
      };
    } else {
      this.ctx.body = '请求失败';
    }
  }
}


module.exports = wechatController;
