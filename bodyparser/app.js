'use strict';

const bodyparser = require('koa-bodyparser');
const convert = require('koa-convert');
const Paloma = require('paloma');
const app = new Paloma();

app.use(convert(bodyparser()));

app.controller('indexCtrl', function (ctx, next) {
  console.log('1');
  ctx.body = ctx.request.body;
  next();
});

// `app.route` use `app.use` internally, so it is a middleware.
app.route({
  method: 'POST',
  path: '/',
  controller: 'indexCtrl'
});

app.use((ctx, next) => {
  console.log('2');
});

app.listen(3000);
