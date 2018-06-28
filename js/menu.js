$('.btn-mobile-menu').click(function() {
	$(this).toggleClass('active');
	$('.site-nav').toggleClass('active');
});

$('a[data-js="item-menu"]').click(function() {
    $('.btn-mobile-menu').removeClass('active');
    $('.menu-nav-mobile').removeClass('active');
});
