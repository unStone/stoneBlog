var fn_index = async (ctx, next) => {
    ctx.render('../views/blog/index.html', {
        title: 'stoneBlog'
    });
};

var fn_simditor = async (ctx, next) => {
    ctx.render('../views/blog/simditor.html', {
        title: 'simditor'
    });
};

module.exports = {
  'GET /stone/blog': fn_index,
  'GET /stone/blog/simditor': fn_simditor
}