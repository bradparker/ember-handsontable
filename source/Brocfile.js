/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('vendor/handsontable/dist/jquery.handsontable.full.js');

module.exports = app.toTree();
