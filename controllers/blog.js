var fn_index = async (ctx, next) => {
    ctx.render('../views/blog/index.html', {
        title: 'stoneBlog'
    });
};

module.exports = {
  'GET /stone/blog': fn_index
}