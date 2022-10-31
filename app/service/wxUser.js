/* eslint-disable array-callback-return */
const Service = require('egg').Service;

class addWxUser extends Service {
  async getwxUserList() {
    try {
      const wxUserList = await this.app.model.WxUser.findAll();
      const wxuserListPart = [];
      wxUserList.map(item => {
        wxuserListPart.push({
          id: item.id,
          nickname: item.nickname,
          sex: item.sex,
        });
      });
      return wxuserListPart;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = addWxUser;
