const Controller = require('egg').Controller;

class WeatherController extends Controller {
  async getWeatherData() {
    console.log('getWeatherData');
    const data = await this.ctx.service.weather.getWeather('101281601');
    this.ctx.body = data;
    console.log(data);
  }
}
module.exports = WeatherController;
