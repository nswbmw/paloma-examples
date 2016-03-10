'use strict';

const Paloma = require('paloma');
const app = global.app = new Paloma();
const usage = require('../usage');

app.load('services');
app.load('controllers');
app.load('routes');

app.constant('_', require('lodash'));

app.listen(3000, () => {

  var user = `[${['nswbmw', 'john', 'jack', 'tom'].join('|')}]`;

  usage([{
    req: 'curl http://localhost:3000/',
    res: 'This is index page'
  }, {
    req: 'curl http://localhost:3000/matrix',
    res: `matrix - posted by ${user}`
  }]);
});
