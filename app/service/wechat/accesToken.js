// 请求获取access_token
/**
 * 请求的地址
 * https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
 * 请求方法
 * get
 *
 * 设计思路
 * 1.首次本地没有，发送请求获取access_token,保存下来
 * 2.第二次或以后
 *    -先去本地读取文件，判断是否过期
 *      -过期了
 *        -重新请求获取access_token,保存下来覆盖之前的文件（保证文件时唯一的）
 *      -没有过期
 *        -直接使用
 *
 *
 * 整体代码思路
 * 读取本地文件获取access_token(readAccessToken)
 * 本地有文件
 *  判断是否过期了(isAccesssToken)
 *    没过期
 *      直接使用
 *    过期了
 *      发送请求获取access_token(getAccessToken),然后保存下来(saveAccessToken)
 * 本地没有文件
 *    发送请求获取access_token(getAccessToken),然后保存下来(saveAccessToken)
 *
 * */

const Service = require('egg').Service;

class AccessTokenService extends Service {
  // 获取access_token值
  getAccessToken() {
    const { appid, appsecret } = this.ctx.app.config.wechat;
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`;
    const { data } = this.ctx.app.curl(url, {
      method: 'get',
      rejectUnauthorized: false,
      dataType: 'json',
    });
    return data; // 返回值access_token
  }
  // 读取access_token值
  readAccessToken() {

  }
  // 保存access_token
  saveAccessToken() {

  }

  // access_token是否过期
  isAccesssToken() {

  }
}

module.exports = AccessTokenService;
