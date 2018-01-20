
function getTargetTop(elem) {
  // gets the id of the section header
  // from the navigation's href e.g. ("#html")
  const id = elem.attr('href');

  // Gets the distance from the top and
  // subtracts the height of the nav.

  if ($(id).offset()) {
    return $(id).offset().top - 10;
  }
  return 0;
}

function scrollTo(to) {
  const target = getTargetTop(to);
  // scrolls to that section.

  $('html, body').animate({
    scrollTop: target,
  }, 500);

  // prevent the browser from jumping down to section.
  event.preventDefault();
}

// Smooth scroll when user click link that starts with #
$('#nav a[href^="#"]').click(function () {
  // gets the distance from the top of the
  // section refenced in the href.
  scrollTo($(this));
});
