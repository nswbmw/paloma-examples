'use strict';

app.route({
  method: 'GET',
  path: '/:title',
  controller: 'postCtrl' // ['postCtrl', ...]
});