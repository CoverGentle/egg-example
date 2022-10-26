const Controller = require('egg').Controller;

class EpidemicController extends Controller {
  async getEpidemicInfo() {
    const data = await this.ctx.service.epidemic.getEpidemic();
    this.ctx.body = {
      code: 2000,
      data,
      msg: '成功',
    };
  }
}

module.exports = EpidemicController;
