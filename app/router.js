'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);
  router.get('/', controller.home.getData);
  // router.get('/fruits', controller.fruits.index);
  // router.get('/fruits/:id', controller.fruits.getId);
  // router.get('/createPage', controller.fruits.createPage);
  // router.post('/createFruit', controller.fruits.createFruit);

  router.resources('fruits', '/fruits', controller.fruits);
  router.get('/jwt', controller.jwt.index);
  router.post('/jwtLogin', controller.jwt.doLogin);
  router.get('/jwtMessage', app.middleware.checkToken(), controller.jwt.getMessage);
  router.post('/user/login', controller.user.login);
  router.post('/user/register', controller.user.register);
  router.post('/weather/single', controller.weather.getWeatherData);
  router.post('/weather/add', controller.weather.addWeatherData);
  router.get('/weather/city', app.middleware.checkToken(), controller.weather.getCityList);
  router.get('/epidemic/info', app.middleware.checkToken(), controller.epidemic.getEpidemicInfo);
  router.resources('grade', '/grade', app.middleware.checkToken(), controller.grade);
  router.resources('student', '/student', app.middleware.checkToken(), controller.student);
  router.resources('user', '/user', app.middleware.checkToken(), controller.user);

  // 微信公众号开发的接口
  router.get('/wechat/check', controller.wechat.gzhindex.check);
  router.get('/wechat/getJssdkConfig', controller.wechat.gzhindex.getJssdkConfig);
  router.get('/wechat/getEverToken', controller.wechat.gzhindex.getEverToken);
  router.post('/wechat/getAuthUser', controller.wechat.wxindex.getAuthUser);
  router.get('/wechat/getWxUserInfo', controller.wechat.wxindex.getWxUserInfo);
  router.get('/wechat/getwxUserListInfo', app.middleware.checkToken(), controller.wechat.wxindex.getwxUserListInfo);
  router.get('/wechat/getTicket', controller.wechat.gzhindex.getTicket);

};
