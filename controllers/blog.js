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
    const data = ctx.request.body || '';
    console.log(data.title)
    ctx.status=200;
    // var email = ctx.request.body.email || '',
};

module.exports = {
  'GET /stone/blog': fn_index,
  'GET /stone/blog/simditor': fn_simditor,
  'POST /stone/api/blog/simditor': fn_post_simditor
}