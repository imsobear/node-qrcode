
var qrcode = require('../');

qrcode({
  browser: 'chrome',
  size: 200,
  text: 'http://weibo.com',
  qrcodePath: './qrcode.png'
}).then(function(qrcodePath) {
  console.log(qrcodePath);
});