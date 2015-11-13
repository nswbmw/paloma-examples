'use strict';

const Paloma = require('paloma');
const app = new Paloma();
const validator = require('validator-it');
const convert = require('koa-convert');
const bodyparser = require('koa-bodyparser');

app.use(convert(bodyparser()));

app.controller('indexCtrl', function (ctx, next, indexService) {
  ctx.body = indexService.getBody();
});

app.service('indexService', function () {
  this.getBody = function () {
    return 'Hello, Paloma';
  };
});

app.route({
  method: 'post',
  path: '/',
  controller: 'indexCtrl',
  validate: {
    body: {
      user: function checkUser(user) {
        if (!user) {
          throw new Error('No user'); // this.throw(400, new Error('No user'))
        }
      }
    },
    'body.age': validator.isNumeric()
  }
});

app.listen(3000);
