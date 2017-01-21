$(function() {
   $('.container').height($(window).height())

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
})