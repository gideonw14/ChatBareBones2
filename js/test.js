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

function pageLoad() {
	console.log("Javascript is working.")
}

function displayTime() {
	if(typeof displayTime.showHide == 'undefined'){
		displayTime.showHide = false;
	}
	displayTime.showHide = !displayTime.showHide;
	if(displayTime.showHide){
		document.getElementById("time").innerHTML = Date();
	}
	else{
		document.getElementById("time").innerHTML = "";
	}
}