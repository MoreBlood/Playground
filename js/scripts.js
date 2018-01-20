$(document).ready(() => {
  if (document.location.hash !== '/') {
    getPage(document.location.hash);
  }
  $('header a').click(function (e) {
    e.preventDefault();
    const path = $(this).attr('href');
    window.history.replaceState({}, path, path);
    getPage(path);
  });
});

const print = (data) => {
  console.log(data);
};

function scrollToId(id) {
  $('html, body').animate({
    scrollTop: $(id).offset().top - 10,
  }, 500);
}

function getPage(page) {
  let pageName = page;

  if (!pageName) {
    pageName = 'index';
  }

  $.ajax({
    type: 'GET',
    url: `pages/${pageName.replace('#/', '').substring(0, pageName.indexOf('/#') == -1 ? pageName.length : pageName.indexOf('/#') - 2)}.html`,
    dataType: 'html',
    success(msg) {
      $('article').html(msg);
      if ((/\/\#/).test(pageName)) {
        scrollToId(`${pageName.substring(pageName.indexOf('/#') + 1, pageName.length)}`);
      }
    },
    error(error) {
      $('article').html(`<h1>${error.status}</h1> <h2>${error.statusText}</h2>`);
    },
  });
}
