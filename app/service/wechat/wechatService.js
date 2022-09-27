/**
 * 开发服务器-验证消息是否来自于微信服务器
 * 目的：计算得出signature微信加密签名，和微信传递过来的signature进行对比，如果一样说明消息来自于微信服务器
 *  1.将参与微信加密签名的三个参数（timestamp、nonce、token）,组合在一起按照字典序排序，并组合在一起形成一个数组
 *  2.将数组拼接成一个字符串，进行sha1加密
 * 3.加密完就生成一个signature和微信的进行对比
 *    如果一样，说明消息来自于微信服务器，返回echostr给微信服务器
 *    如果不一样，说明不是微信服务器发送的消息，返回error
 * */
const crypto = require('crypto');
const Service = require('egg').Service;
class UserService extends Service {
  check() {
    const { signature, nonce, timestamp, echostr } = this.ctx.query;
    console.log(signature, 'signature');
    const token = this.ctx.app.config.wechat.Token;
    console.log(token);
    const str = [ token, timestamp, nonce ].sort().join('');
    const sha = crypto.createHash('sha1').update(str).digest('hex');
    console.log(sha);
    return sha === signature ? echostr : null;
  }
}

module.exports = UserService;
