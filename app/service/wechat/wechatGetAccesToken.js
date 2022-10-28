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
  async getAccessToken() {
    try {
      const { appid, appsecret } = this.app.config.wechat;
      const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`;
      const { data } = await this.ctx.app.curl(url, {
        method: 'get',
        rejectUnauthorized: false,
        dataType: 'json',
      });
      // {
      //   access_token: '61_gcjqb0KVa127Jb22ZktWtu_F4aaJG_d6YeOcJ2gK85NV0zdlFWkXM8Wn_QExN95DbFo8Dr7H1rbWnF_VnY9nz3aRm1TqPSzf6vBcN9iBMa5yMhRy-giSIbbHABxvj8-CmRQOUjLmYhwjPXEkYZBcADASTV',
      //   expires_in: 7200
      // }
      data.expires_in = Date.now() + (data.expires_in - 300) * 1000;
      // 储存token有效时间，和token
      this.ctx.service.redis.set('gzhexpires_in', data.expires_in);
      this.ctx.service.redis.set('gzhaccess_token', data.access_token);
      return data; // 返回值access_token
    } catch (error) {
      console.error('getAccessToken出问题了' + error);
      return error;
    }
  }
  // 读取access_token值
  // readAccessToken() {
  //   const expiresTime = this.ctx.service.redis.get('gzhexpires_in');
  //   const accessToken = this.ctx.service.redis.get('gzhaccess_token');
  //   return {
  //     accessToken,
  //     expiresTime,
  //   };
  // }


  // access_token是否过期
  async isAccesssToken() {
    const time = await this.ctx.service.redis.get('gzhexpires_in');
    if (Date.now() < time) {

      console.log('没有过期');
      return true;
    }
    console.log('过期');
    return false;
  }


  // 配置永不过期的token

  async getEverToken() {
    const boo = await this.isAccesssToken();
    if (boo) {
      console.log(boo, '1');
      return {
        access_token: await this.ctx.service.redis.get('gzhaccess_token'),
        expires_in: await this.ctx.service.redis.get('gzhexpires_in'),
      };
    }
    console.log(boo, '2');
    this.getAccessToken();

  }
}

module.exports = AccessTokenService;
