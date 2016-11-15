'use strict';

const Paloma = require('paloma');
const app = new Paloma();
const usage = require('../usage');

app.controller('indexCtrl', function (ctx, next, indexService) {
  ctx.body = `Hello, ${indexService.getName()}`;
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
