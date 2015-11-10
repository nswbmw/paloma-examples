'use strict';

const Paloma = require('paloma');
const app = global.app = new Paloma();

app.load('services');
app.load('controllers');
app.load('routes');
app.load('views');

app.constant('_', require('lodash'));

app.listen(3000);
