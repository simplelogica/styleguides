$(document).on('click', '.btn-mobile-menu', function(e) {
    e.preventDefault();
	$(this).toggleClass('active');
	$('.site-nav').toggleClass('active');
});

