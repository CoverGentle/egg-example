// 获取数据
// 接口https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=localCityNCOVDataList,diseaseh5Shelf

const Service = require('egg').Service;

class EpidemicService extends Service {
  // 获取疫情数据
  async getEpidemic() {
    const data = await this.ctx.curl('https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=localCityNCOVDataList,diseaseh5Shelf', {
      method: 'post',
      rejectUnauthorized: false,
      dataType: 'json',
    });
    return data.res.data.data;
  }
}

module.exports = EpidemicService;
