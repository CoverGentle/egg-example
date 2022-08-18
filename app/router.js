'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/getData', controller.home.getData);
  // router.get('/fruits', controller.fruits.index);
  // router.get('/fruits/:id', controller.fruits.getId);
  // router.get('/createPage', controller.fruits.createPage);
  // router.post('/createFruit', controller.fruits.createFruit);

  router.resources('fruits', '/fruits', controller.fruits);
};
