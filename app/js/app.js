// Função Toogle do menu drop-down
var menuDrop = function(param) {
  $(param).click(function() {
    $('#container-menu-drop-down').toggle( 'slow', function() { } );
  });

  $('#wrapper').click(function () {
    $('#container-menu-drop-down').hide('slow', function() {
      $(this).css('display', 'none');
    });
  });
};

// Função Toogle da tela de busca
var openSearch = function(param) {
  $(param).click(function() {
    $('.bg-mask').toggle( 'slow', function() { } );
  });
};

// Função clear do input text de busca
var clearInput = function() {
  $('.close-input').click( function() {
    $('.txtSearch').val('');
    $('.txtSearch').focus();
  });
};

// Função focus and blur
var focusAndBlur = function(param) {
  $(param).focus(function() {
    if($(this).val() === this.defaultValue){
      $(this).val('');
    }
  });
  $(param).blur(function() {
    if($(this).val() === ''){
      $(this).val(this.defaultValue);
    }
  });
};

// Ready da página
$(function() {
  menuDrop('.btn-menu-drop');
  openSearch('.search');
  clearInput();
  focusAndBlur('.txtSearch');

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

  $('.containter-products').masonry({
    // options
    itemSelector: '.product .medium',
    columnWidth: 200
  });

});
