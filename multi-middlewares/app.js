'use strict';

const Paloma = require('paloma');
const app = new Paloma();
const usage = require('../usage');

app.constant('_', require('lodash'));

app.controller('indexCtrl', function (ctx, next, indexService) {
  ctx.body = `Hello, ${indexService.getName(ctx.query.user)}`;
});

app.service('indexService', function (_) {
  this.getName = function (user) {
    return _.capitalize(user);
  };
});

app.route({
  method: 'GET',
  path: '/',
  controller: [
    async function checkLogin(ctx, next) {
      if (!ctx.query.user) {
        return ctx.throw(401);
      }
      await next();
      console.log(ctx.body);// Hello, Nswbmw
    },
    'indexCtrl'
  ]
});

app.listen(3000, () => {
  usage('curl http://localhost:3000', 'Unauthorized');
  usage('curl http://localhost:3000?user=nswbmw', 'Hello, Nswbmw');
});
