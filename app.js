'use strict';

var AV = require('leanengine');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

console.log(isProduction, '1----------------', process.env.NODE_ENV)

app.use(async (ctx, next) => {
  const start = new Date().getTime();//当前时间
  await next();
  const ms = new Date().getTime() - start;
  console.log(`${ctx.request.method} || ${ctx.request.url} || ${ms}ms`)
  console.log(isProduction, '2----------------', process.env.NODE_ENV)
})

if (! isProduction) {
  let staticFiles = require('./static-files');
  app.use(staticFiles('/static/', __dirname + '/static/'));
}

// parse request body:
app.use(bodyParser());

app.use(templating('view', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controllers:
app.use(controller());
 
AV.init({
  appId: process.env.LEANCLOUD_APP_ID || '6g80kjuk9DLvKuH9EjszQ5Mj-gzGzoHsz',
  appKey: process.env.LEANCLOUD_APP_KEY || 'QVk75Xmcfx9J1rGxqKOSjJdW',
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || 'uTf6JwaNqvbbt7iv9MaCNmb4'
});

// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000);
app.listen(PORT, function () {
  console.log('Node app is running, port:', PORT);

  // 注册全局未捕获异常处理器
  process.on('uncaughtException', function(err) {
    console.error("Caught exception:", err.stack);
  });
  process.on('unhandledRejection', function(reason, p) {
    console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason.stack);
  });
});
