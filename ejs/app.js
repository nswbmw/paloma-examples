'use strict';

const path = require('path');
const co = require('co');
const Paloma = require('paloma');
const app = global.app = new Paloma();
const render = require('koa-ejs');
const usage = require('../usage');

render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  cache: false,
  debug: true
});
app.context.render = co.wrap(app.context.render);

app.controller('indexCtrl', function (ctx, next, indexService) {
  return ctx.render('index', {
    name: indexService.getName()
  });
});

app.controller('404Ctrl', function (ctx, next) {
  return ctx.render('404', {
    path: ctx.path
  });
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

app.route({
  method: 'GET',
  path: '/(.+)',
  controller: '404Ctrl'
});

app.listen(3000, () => {
  usage([{
    req: 'curl http://localhost:3000',
    res: '<h1>Hello Paloma, This is index page</h1>'
  }, {
    req: 'curl http://localhost:3000/anything',
    res: 'Not Found: /anything'
  }]);
});
