if (document.location.hash !== "/") {
    getPage(document.location.hash)
}

$(document).ready(function() {
    $('header a').click(function (e) {
        e.preventDefault()
        var path = $(this).attr('href')
        window.history.replaceState({}, path, path);
        getPage(path);
    });
});


function scrollToId (id) {
    $('html, body').animate({
        scrollTop:  $(id).offset().top - 10
    }, 500);
}

function getPage(pageName) {
    if (pageName === "") {
        pageName = "index"
    }
    $.ajax({
        type: 'GET',
        url: `pages/${pageName.replace('#/', '')}.html`,
        dataType: "html",   //expect html to be returned
        success: function(msg) {
            $('article').html(msg);
            if ((/\?/).test(pageName)) {
                scrollToId("#" + pageName.substring(pageName.indexOf('?') + 1, pageName.length));
            }  
        },
        error: function(erorr) {
            $('article').html(`<h2>404</h2> <h3>${erorr.statusText}</h3>`); 
        },
    });
};