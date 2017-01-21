var title, abstract, srticleId, data;

$(function() {
  $('.container').height($(window).height())

  //编辑器样式
  var editor = new Simditor({
    textarea: $('#editor'),
    placeholder: '',
    params: {},
    upload: false,
    tabIndent: true,
    toolbar: [
      'title',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'fontScale',
      'color',
      'ol',
      'ul',
      'blockquote',
      'code',
      'table',
      'link',
      'image',
      'hr',
      'indent',
      'outdent',
      'alignment'
    ],
    toolbarFloat: false,
    toolbarFloatOffset: 0,
    toolbarHidden: false,
    pasteImage: false,
    cleanPaste: false
  });

  //事件绑定
  $('.container').on('click', '.ok', function() {
    title = $('.title-input').val();
    abstract = $('.abstract-input').val();
    srticleId = $('.srticle-id-input').val();

    data = {
      title: title,
      abstract: abstract,
      srticleId: srticleId
    };
    console.log(data);
    $.ajax({
      type: 'POST',
      url: '/stone/api/blog/simditor',
      data: data,
      success: function(res) {
        console.log(res);
      },
      error: function(err) {
        console.log(err)
      }
    })
    console.log('ok', title, '@', abstract, '@', srticleId);
  })
})