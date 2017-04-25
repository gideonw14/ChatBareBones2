console.log("test.js is working");

$('form').submit(function() {
    var form = $(this);
    var data = form.serialize();
    console.log("form submit works");

    $.ajax({
        url: '/users',
        method: 'POST',
        data: data,
        success: function(resp){
             console.log("server replied ", resp);
        },
        error: function() {
            //handle error
        }
    });
    return false;
});

function myFunc() {
	console.log("you aren't crazy");
}