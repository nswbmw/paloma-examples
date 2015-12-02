'use strict';

const Paloma = require('paloma');
const app = global.app = new Paloma();
const usage = require('../usage');


app.controller('indexCtrl', function (ctx, next, indexService) {
  ctx.body = indexService.getName();
});

app.controller('404Ctrl', function (ctx, next) {
  ctx.body = 'Sorry';
});

app.service('indexService', function () {
  this.getName = function () {
    return 'paloma';
  };
});

app.load('views');

app.route({
  engine: 'jade',
  method: 'GET',
  path: '/',
  controller: 'indexCtrl',
  template: 'homeView'
});

app.route({
  engine: 'jade',
  method: 'GET',
  path: '/(.+)',
  controller: '404Ctrl',
  template: '404View'
});

app.listen(3000, () => {
  usage([{
    req: 'curl http://localhost:3000',
    res: '<h1>home</h1><hr/><strong>powered by jade</strong>'
  }, {
    req: 'curl http://localhost:3000/anything',
    res: '<h1>Sorry, <code>/anything</code> Not Found</h1>'
  }]);
});
