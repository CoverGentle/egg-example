/**
 * 开发服务器-验证消息是否来自于微信服务器
 * 目的：计算得出signature微信加密签名，和微信传递过来的signature进行对比，如果一样说明消息来自于微信服务器
 *  1.将参与微信加密签名的三个参数（timestamp、nonce、token）,组合在一起按照字典序排序，并组合在一起形成一个数组
 *  2.将数组拼接成一个字符串，进行sha1加密
 * 3.加密完就生成一个signature和微信的进行对比
 *    如果一样，说明消息来自于微信服务器，返回echostr给微信服务器
 *    如果不一样，说明不是微信服务器发送的消息，返回error
 * */
// const crypto = require('crypto');
const sha1 = require('sha1');
const Service = require('egg').Service;
class UserService extends Service {
  // 检查公众号
  check() {
    const { signature, nonce, timestamp, echostr } = this.ctx.request.query;
    console.log(signature, nonce, timestamp, echostr, 'signature, nonce, timestamp, echostr');
    this.ctx.service.redis.set('signature', signature);
    this.ctx.service.redis.set('nonce', nonce);
    this.ctx.service.redis.set('timestamp', timestamp);
    this.ctx.service.redis.set('echostr', echostr);
    const token = this.app.config.wechat.Token;
    const str = [ timestamp, token, nonce ].sort().join('');
    const vasignature = sha1(str);
    if (vasignature === signature) return echostr;
    return false;
  }


  // 返回signature, nonce, timestamp, echostr
  async back() {
    const signature = await this.ctx.service.redis.get('signature');
    const nonce = await this.ctx.service.redis.get('nonce');
    const timestamp = await this.ctx.service.redis.get('timestamp');
    const echostr = await this.ctx.service.redis.get('echostr');
    return {
      signature,
      nonce,
      timestamp,
      echostr,
    };
  }

  // 获取jsapi_ticket
  // get请求https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi

  async getJsApiTicket() {
    const ACCESS_TOKEN = this.ctx.service.redis.get('gzhaccess_token');
    const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${ACCESS_TOKEN}&type=jsapi`;
    const { data } = await this.ctx.curl(url, {
      method: 'get',
      rejectUnauthorized: false,
      dataType: 'json',

    });
    return data;
  }


}

module.exports = UserService;
