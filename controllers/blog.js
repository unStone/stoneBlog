'use strict';
var AV = require('leanengine');

//bolg首页
const fn_index = async (ctx, next) => {
    ctx.render('../views/blog/index.html', {
        title: 'stoneBlog'
    });
};

//blog文章编辑页
const fn_simditor = async (ctx, next) => {
    ctx.render('../views/blog/simditor.html', {
        title: 'simditor'
    });
};

//blog文章发布接口
const fn_post_simditor = async (ctx, next) => {
    console.log(1111,ctx,222,ctx.request,333,ctx.request.body);

    //错误判断退出
    if(!ctx.request) {
        ctx.status = 404;
        ctx.body = {
            state: 10000,
            msg: '未接收到信息'
        }
        return 'post error'
    }

    let data = ctx.request.body || '';
    let cookie = ctx.request.cookie || '';
    ctx.status = 200;

    //错误格式
    if(ctx.request.body && !ctx.request.body.title) {
        ctx.body = {
            state: 10001,
            msg: '标题不能为空'
        }
        return 'please add title'
    }

    if(ctx.request.body && !ctx.request.body.content) {
        console.log(ctx.request.body.content)
        ctx.body = {
            state: 10002,
            msg: '内容不能为空'
        }
        return 'please add content'
    }
    
    //成功后保存数据后返回样式
    if(ctx.request.body && !ctx.request.body.srticleId) {
        const TestObject = AV.Object.extend('article');
        const testObject = new TestObject();

        testObject.set(data);
        testObject.save().then(function (data) {
            console.log('objectId is ' + data.id + data.articleId);
            theData = data
        }, function (error) {
            console.error(error);
        });
    }

    if(ctx.request.body && ctx.request.body.srticleId) {
        console.log('articleId', ctx.request.body.srticleId);
        var query = new AV.Query('article');
        query.equalTo('articleId', (ctx.request.body.srticleId*1));
        query.first().then(function(data) {
            console.log('articleId', ctx.request.body.srticleId,data)
        });
    }

    //查询数据并返回
    var startDateQuery = new AV.Query('article');

    ctx.body = {
        state: 200,
        data: data,
    }

};

module.exports = {
  'GET /stone/blog': fn_index,
  'GET /stone/blog/simditor': fn_simditor,
  'POST /stone/api/blog/simditor': fn_post_simditor
}