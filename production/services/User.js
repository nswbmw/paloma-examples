'use strict';

const authors = ['nswbmw', 'john', 'jack', 'tom'];

app.service('User', function (_) {
  this.getUser = function () {
    return _.shuffle(authors).pop();
  };
});