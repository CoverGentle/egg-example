const Controller = require('egg').Controller;

class wechatController extends Controller {
  // 获取到code后请求微信地址获取Auth鉴权用户信息
  async getAuthUser() {
    try {
      const { code } = this.ctx.request.body;
      const { access_token, expires_in, refresh_token, openid, scope } = await this.ctx.service.wechat.wechatAuth.getAuthUserInfo(code);
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

  // 获取基本信息
  async getUnionidInfo() {
    const access = await this.ctx.service.redis.get('gzhaccess_token');
    const openid = await this.ctx.service.redis.get('openid');
    const result = await this.ctx.service.wechat.wechatAuth.getUnionid(access, openid);

    this.ctx.body = {
      data: result,
    };
    console.log(result, 'getUnionidInfo');
  }

  // 获取用户列表
  async getwxUserListInfo() {
    const result = await this.ctx.service.wxUser.getwxUserList();
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
