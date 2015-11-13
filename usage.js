'use strict';

const chalk = require('chalk');
const _ = require('lodash');

module.exports = function usage (payload, resString) {
  let _payload = null;

  if (_.isString(payload)) {
    _payload = [{
      req: payload,
      res: resString
    }];
  }

  if (_.isObject(payload)) {
    _payload = [payload];
    resString = null;
  }

  if (_.isArray(payload)) {
    _payload = payload;
    resString = null;
  }

  showMsg(_payload);
};

function showMsg (payload) {
  _.each(payload, function (p, index) {
    if (index > 0) {
      console.log('\n--------------\n')
    }
    console.log(chalk.green('REQUEST:'));
    console.log(chalk.blue('  ' + p.req));
    console.log(chalk.green('RESPONSE:'));
    console.log(chalk.yellow('  ' + p.res));
  });
};
