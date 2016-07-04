var menuDrop = function(classe) {
  $(classe).click(function() {
    $('#container-menu-drop-down').toggle( 'slow', function() { } );
  });

  $('#wrapper').click(function () {
    $('#container-menu-drop-down').hide('slow', function() {
      $(this).css('display', 'none');
    });
  });
};

var openSearch = function(classe) {
  $(classe).click(function() {
    $('.bg-mask').toggle( 'slow', function() { } );
  });
};

//Ready da página
$(function() {
  menuDrop('.btn-menu-drop');
  openSearch('.search');

  /*Slicker Settings*/
  $('.carrousel').slick({
    arrows: false,
    dots: true,
    dotsClass: 'myDots',
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  });

});

$(function() {
  console.log('->', 'carousel');
});

$(function() {
  console.log('->', 'tab');
});

$(function() {
  console.log('->', 'validation');
});
