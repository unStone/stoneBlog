
//启动入口
var register = require('babel-core/register');

//将es7格式的代码转化为es6
register({
  presets: ['stage-3']
});

//这个地方的require不是弄得原来的方法，而是bable替换掉的方法。
require('./server.js')