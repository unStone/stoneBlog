'use strict';

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
