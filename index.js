'use strict';

var fs = require('fs');
var http = require('http');
var path = require('path');
var Browser = require('node-browser');
var getPort = require('get-port');
var debug = require('debug')('qrcode');

module.exports = qrcode;

/**
 * generate qrcode
 *
 * @param  {Object} cfg
 *   @param {String} text
 *   @param {String} size
 *   @param {String} qrcodePath
 *   @param {String} browser
 * @return {Promise}
 */
function qrcode(cfg) {

  var browser = new Browser({
    name: cfg.browser || 'phantomjs'
  });
  var qrcodePath = '';
  var server;

  return getPort().then(function(port) {

    debug('get free port: ', port);

    return new Promise(function(resolve) {

      debug('create server start');

      server = http.createServer(function(req, res) {
        var indexPath = path.resolve(__dirname, './statics/index.html');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(fs.readFileSync(indexPath));
      });
      server.listen(port, '127.0.0.1', function() {
        resolve('http://127.0.0.1:' + port);
      });

    });

  }).then(function(url) {

    debug('start open browser');
    return browser.open(url);

  }).then(function() {

    debug('start inject script');
    return browser.injectJs(getScript(cfg));

  }).then(function(data) {

    debug('start generate png');
    var base64Data = data.value.replace(/^data\:image\/octet\-stream\;base64\,/, '');
    qrcodePath = path.resolve(process.cwd(), cfg.qrcodePath);

    try {
      fs.writeFileSync(qrcodePath, base64Data, 'base64');
      debug('generate qrcode successfully');
    } catch (err) {
      throw err;
    }

    return browser.close();
  }).then(function() {
    server.close();
    return qrcodePath;
  });

};


/**
 * get the script to generate canvas in the browser
 */
function getScript(cfg) {

  var script = function(cfg) {
    $('#J_Qrcode').qrcode({
      'render': 'canvas',
      'size': cfg.size || 150,
      'color': '#3a3',
      'text': cfg.text
    });

    var canvas = $('#J_Qrcode canvas')[0];
    // here is the most important part because if you dont replace you will get a DOM 18 exception.
    var imageData = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

    endCallback(imageData);
  };

  return '(' + script.toString() + ')(' + JSON.stringify(cfg) + ');';
}