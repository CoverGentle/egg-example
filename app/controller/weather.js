const Controller = require('egg').Controller;

class WeatherController extends Controller {
  // 获取城市天气信息
  async getWeatherData() {
    const { cityNum } = this.ctx.request.body;
    const data = await this.ctx.service.weather.getWeather(cityNum);
    if (data) {
      this.ctx.body = {
        code: 2000,
        data,
        msg: '成功',
      };
    } else {
      this.ctx.body = {
        code: 2000,
        data: null,
        msg: '失败',
      };
    }
  }
  // 添加城市信息
  async addWeatherData() {
    const { cityName, cityNumber } = this.ctx.request.body;
    const cityInfo = await this.ctx.service.weather.addCity(cityName, cityNumber);
    if (cityInfo) {
      this.ctx.body = {
        code: 2000,
        msg: '添加成功',
      };
    } else {
      this.ctx.body = {
        code: 4000,
        msg: '添加失败',
      };
    }
  }
  // 获取城市列表信息
  async getCityList() {
    const cityList = await this.ctx.service.weather.getCityList();
    if (cityList) {
      const list = [];
      cityList.forEach(item => {
        list.push({
          id: item.id,
          cityname: item.cityName,
          citynumber: item.cityNumber,
        });
      });
      this.ctx.body = {
        code: 2000,
        data: list,
        msg: '成功',
      };
    } else {
      this.ctx.body = {
        code: 4000,
        data: null,
        msg: '失败',
      };
    }
  }
}
module.exports = WeatherController;
