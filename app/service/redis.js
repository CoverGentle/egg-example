const Service = require('egg').Service;

const time = 60 * 60 * 24 * 365; // 默认缓存失效时间 365天

class redisService extends Service {

  /**
     * 设置 redis 缓存
     * @param { String } key 键
     * @param {String | Object | array} value 值
     * @param { Number } expir 过期时间 单位秒
     * @param seconds
     * @return { String } 返回成功字符串OK
     */
  // async setRedis(key, value, expir = 0) {
  //   if (expir === 0) {
  //     // console.log(JSON.stringify(value));
  //     return await this.app.redis.set(key, value);
  //   }
  //   return this.app.redis.set(key, value, expir);
  // }
  async set(key, value, seconds) {
    // seconds 有效时长
    const { redis } = this.app;
    value = JSON.stringify(value);
    if (!seconds) {
      // await redis.set(key, value);
      await redis.set(key, value, 'EX', time);
    } else {
      // 设置有效时间
      await redis.set(key, value, 'EX', seconds);
    }
  }

  // 获取
  async get(key) {
    const { redis } = this.app;
    let data = await redis.get(key);
    if (!data) return;
    data = JSON.parse(data);
    return data;
  }
  // 清空redis
  async flushall() {
    const { redis } = this.app;
    redis.flushall();
    return;
  }
}

module.exports = redisService;
