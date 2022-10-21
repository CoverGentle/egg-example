const Service = require('egg').Service;
class redisService extends Service {

  /**
     * 设置 redis 缓存
     * @param { String } key 键
     * @param {String | Object | array} value 值
     * @param { Number } expir 过期时间 单位秒
     * @return { String } 返回成功字符串OK
     */
  async setRedis(key, value, expir = 0) {
    if (expir === 0) {
      // console.log(JSON.stringify(value));
      return await this.app.redis.set(key, value);
    }
    return this.app.redis.set(key, value, expir);
  }

  /**
     * 获取 redis 缓存
     * @param { String | array | Object} key 键
     * @return { String | array | Object } 返回获取的数据
     */
  async getRedis(key) {
    const result = this.app.redis.type(key);
    return result;

  }

  /**
     * redis 自增
     * @param { String } key 键
     * @param { Number } value 自增的值
     * @param number
     * @return { Number } 返回递增值
     */
  async incrRedis(key, number = 1) {
    if (number === 1) {
      return await this.app.redis.incr(key);
    }
    return await this.app.redis.incrby(key, number);
  }

  /**
     * 删除指定key
     * @param {String} key
     */
  async removeRedis(key) {
    const { redis } = this.app;
    return await redis.del(key);
  }

  /**
     * 清空缓存
     */
  async clear() {
    return await this.app.redis.flushall();
  }
}

module.exports = redisService;
