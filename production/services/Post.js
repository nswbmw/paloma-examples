'use strict';

app.service('Post', function (User) {
  this.getPost = function (title) {
    return `${title} - posted by ${User.getUser()}`;
  };
});