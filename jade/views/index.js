'use strict';

const fs = require('fs');
const path = require('path');

const dirname = path.normalize(__dirname);

let views = [];

try {
  let jades = fs.readdirSync(dirname).filter( (filename) => /\.jade$/.test(filename) );

  views = jades.map( (j) => {
    let viewName = j.split('.')[0];
    let template = fs.readFileSync(path.join(dirname, j), 'utf-8');
    return {
      viewName: viewName,
      template: template
    };
  });
} catch (e) {
  console.log('shit', e);
}

views.forEach( (v) => app.view(v.viewName, v.template) );
