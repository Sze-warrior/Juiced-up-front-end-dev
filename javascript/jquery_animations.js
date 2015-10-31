//This jQuery section below is going
//to make the mobile menu slide toggle down and appear.
$(document).ready(function(){
	$(".handle").click(function(){
  	$(".navbar").slideToggle();
  });

$(window).resize(function() {
	$("nav ul").css('display', '');
 });
//This jQuery section above is going
//to make the mobile menu slide toggle down and appear.


//This jQuery section below is going
//to make the back to top button work.
$(".button-top").click(function(){
    $('html, body').animate({
    scrollTop: $("#logo").offset().top
    },450);
 });
//This jQuery section below is going
//to make the back to top button work.

});
