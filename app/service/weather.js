const Service = require('egg').Service;

class WeatherService extends Service {
  // 添加城市信息
  async addCity(cityName, cityNumber) {
    try {
      const cityInfo = this.app.model.City.create({
        cityName,
        cityNumber,
      });
      return cityInfo;
    } catch (error) {
      return null;
    }
  }
  // 获取城市列表信息
  async getCityList() {
    try {
      const cityList = await this.ctx.app.model.City.findAll();
      return cityList;
    } catch (error) {
      return null;
    }
  }

  // 获取天气信息
  async getWeather(cityNum) {
    const { data } = await this.ctx.curl(`http://t.weather.sojson.com/api/weather/city/${cityNum}`, {
      method: 'get',
      rejectUnauthorized: false,
      dataType: 'json',
    });
    const weatherData = data.data.forecast.slice(0, 7);
    return weatherData;
  }
}

module.exports = WeatherService;
