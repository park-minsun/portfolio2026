$(document).ready(function() { 
  // 모바일 GNB
  $('.menu-btn').click(function() {
    $(this).toggleClass('active');
    $('.header .logo').toggleClass('hide');
    $('#overlay').toggleClass('open');
 });


 // TOP 버튼
 $('.top-btn').click(function() {
    $('html, body').animate({scrollTop : 0}, 400);
    return false;
  });
});