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
  router.get('/weather/city', controller.weather.getCityList);
  router.get('/epidemic/info', controller.epidemic.getEpidemicInfo);
  router.resources('grade', '/grade', app.middleware.checkToken(), controller.grade);
  router.resources('student', '/student', app.middleware.checkToken(), controller.student);
  router.resources('user', '/user', app.middleware.checkToken(), controller.user);

  // 微信公众号开发的接口
  router.get('/wechat/check', controller.wechat.index.check);
  router.get('/wechat/getAccessToken', controller.wechat.index.getAccessTokenInfo);
  router.post('/wechat/getAuthUser', controller.wechat.index.getAuthUser);
  router.get('/wechat/getWxUserInfo', controller.wechat.index.getWxUserInfo);
  router.get('/wechat/getwxUserListInfo', controller.wechat.index.getwxUserListInfo);

};
