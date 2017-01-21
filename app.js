'use strict';

var AV = require('leanengine');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

app.use(async (ctx, next) => {
  const start = new Date().getTime();//当前时间
  await next();
  const ms = new Date().getTime() - start;
  console.log(`${ctx.request.method} || ${ctx.request.url} || ${ms}ms`)
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

app.listen(36029);
console.log('app started at port 36029...')


AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
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
