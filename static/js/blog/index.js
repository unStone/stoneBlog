var myScroll;

$(function() {
    //控制整个页面高度与可视高度一样高
    $('.container').height($(window).height())

    myScroll = new IScroll('#wrapper', {
        click: true,
        scrollbars: false,
        scrollbars: 'custom'
    });

    console.dir(myScroll.options);
})