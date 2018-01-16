$(document).ready(function() {
    $('a').click(function (e) {
        getPage(this.hash);
    });
});

function getPage(pageName) {
    $.ajax({
        type: 'GET',
        url: `pages/${pageName.replace('#', '')}.html`,
        dataType: "html",   //expect html to be returned
        success: function(msg) {
            $('article').html(msg);    
        },
        error: function(erorr) {
            $('article').html(`<h2>404</h2> <h3>${erorr.statusText}</h3>`); 
        },
    });
};