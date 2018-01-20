(function (global) {
  class Router {
    constructor(settings) {
      // settings
      this.CONTAINER = settings.container; // article
      this.HEADER = settings.header;// header
      this.PAGES_PATH = settings.pagesPath; // pages
      this.MAIN_PAGE = settings.mainPage; // index

      this.getPage(document.location.hash);

      // add listners to navigation header
      $(`${this.HEADER} a`).click(function (e) {
        e.preventDefault();
        const path = $(this).attr('href');
        // add path to url
        window.history.replaceState({}, path, path);
        this.getPage(path);
      });
    }

    // helper to scroll to #id
    static scrollToId(id) {
      $('html, body').animate({
        scrollTop: $(id).offset().top - 10,
      }, 500);
    }

    // get page from server and put it to article
    getPage(page) {
      let pageName = page;
      const that = this;

      if (!pageName) {
        pageName = this.MAIN_PAGE;
      }

      $.ajax({
        type: 'GET',
        // cut first and navigation in page #/home/#car => home
        url: `${this.PAGES_PATH}/${pageName.replace('#/', '').substring(0, pageName.indexOf('/#') === -1 ? pageName.length : pageName.indexOf('/#') - 2)}.html`,
        dataType: 'html',
        success(msg) {
          $(that.CONTAINER).html(msg);
          // if navigation in page
          if ((/\/#/).test(pageName)) {
            Router.scrollToId(`${pageName.substring(pageName.indexOf('/#') + 1, pageName.length)}`);
          }
        },
        error(error) {
          $(that.CONTAINER).html(`<h1>${error.status}</h1> <h2>${error.statusText}</h2>`);
        },
      });
    }
  }
  // make it global for reuse
  global.Router = Router;
}(this));

