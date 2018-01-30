$('.gallery__element').click(function (e) {
    $('.image-holder').css({
        'background-image': 'url(/images/' + $(this).attr('high-res') + ')'
    });
    $('.show-off').fadeIn()
})

$('.show-off').click(function (e) {
    $('.show-off').fadeOut()
})