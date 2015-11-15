'use strict';

const Paloma = require('paloma');
const app = new Paloma();
const validator = require('validator-it');
const convert = require('koa-convert');
const bodyparser = require('koa-bodyparser');
const usage = require('../usage');

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

app.listen(3000, () => {
  usage([{
    req: 'curl -d "user=neo&age=26" http://localhost:3000/',
    res: 'Hello, Paloma'
  }, {
    req: 'curl -d "age=26" http://localhost:3000/',
    res: 'No user'
  }, {
    req: 'curl -d "user=neo&age=shit" http://localhost:3000/',
    res: '[body.age: shit] ✖ isNumeric'
  }]);
});
