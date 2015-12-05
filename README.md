# node-qrcode

> generate qrcode by node.js but not depend on node-canvas.

## why

[qrcode](https://github.com/soldair/node-qrcode) is too hard to use, because of the deep dependency: `qrcode -> node-canvas -> node -> Cairo -> x11`.

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