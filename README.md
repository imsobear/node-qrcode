# node-qrcode [![Build Status](https://travis-ci.org/imsobear/node-qrcode.svg?branch=master)](https://travis-ci.org/imsobear/node-qrcode) [![Coverage Status](https://coveralls.io/repos/imsobear/node-qrcode/badge.svg?branch=master)](https://coveralls.io/r/imsobear/node-qrcode?branch=master)

> generate qrcode by nodejs.

## why

Because of the dependency: `qrcode -> node-canvas -> node -> Cairo -> x11`, [qrcode](https://github.com/soldair/node-qrcode) is too hard to use.

So the node-qrcode is dependent on browser(webdriver/phantomjs) to draw qrcode canvas, It is very easy to use :)

## Usage:

```
tnpm i node-qrcode --save

var qrcode = require('../');

qrcode({
  text: 'http://weibo.com',
  size: 200,
  qrcodePath: './qrcode.png',
  browser: 'chrome'
}).then(function(qrcodePath) {
  console.log(qrcodePath);  // balabala/node-qrcode/qrcode.png
});
```

## API

### qrcode(option)

- option.text: required, the qrcode content
- option.size: option, default 150, qrcode size
- option.qrcodePath: required, save the qrcode png
- option.browser: option, default phanpmjs, values: chrome/phantomjs, chrome is faster but not support linux

## License

MIT &copy; 2015 sobear