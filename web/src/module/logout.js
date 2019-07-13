(function ($) {
  var $box = $('.logout-hook');
  $box.find('.btn-default').off('click').on('click', function () {
    IOT.clearSessionStore('currPage');
    IOT.redirect2URL('/logout');
  });
  $box.find('.btn-cancel').off('click').on('click', function () {
    BootstrapDialog.closeAll();
  });
})(jQuery);
