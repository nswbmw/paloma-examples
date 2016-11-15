'use strict';

const Paloma = require('paloma');
const app = new Paloma();
const usage = require('../usage');

app.controller('indexCtrl', async (ctx, next, indexService) => {
  ctx.body = await Promise.resolve(`Hello, ${indexService.getName()}`);
});

app.service('indexService', function () {
  this.getName = function () {
    return 'Paloma';
  };
});

app.route({
  method: 'GET',
  path: '/',
  controller: 'indexCtrl'
});

app.listen(3000, () => {
  usage('curl http://localhost:3000', 'Hello, Paloma');
});
