'use strict';

app.controller('postCtrl', function (ctx, next, Post) {
  const title = ctx.params.title;
  ctx.body = Post.getPost(title);
});