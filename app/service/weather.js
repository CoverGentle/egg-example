const Service = require('egg').Service;

class WeatherService extends Service {
  async getWeather(cityNum) {
    console.log('getWeather');
    const { data } = await this.ctx.curl(`http://t.weather.sojson.com/api/weather/city/${cityNum}`, {
      method: 'get',
      rejectUnauthorized: false,
      dataType: 'json',
    });
    return data;
  }
}

module.exports = WeatherService;
