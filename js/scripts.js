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
            if(parseInt(msg) !== 0)   
            {
                $('article').html(msg);    
            }
        }
    });
};