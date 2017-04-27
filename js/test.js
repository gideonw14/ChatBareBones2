// $document.ready(function(){
//   $('#login').submit(function(){
//     alert("Login form submit");
//     $.get()
//   });
// });

$(document).ready(function(){
     $("#donald").click(function(){
     	alert("donald button clicked");
        $.ajax({
          type: "POST",
          url: "/api/users",
          data: JSON.stringify({
            username:"Donald Duck",
            password:"password123",
            email:   "donald@duck.com"
          }),
          success: function(data, status){alert(status);},
          statusCode:{
            409: function(){
              alert("Username already taken");
            }
          },
          contentType: "application/json"
        });
    });
});

function validateForm() {
    var username = document.forms["createAccount"]["username"].value;
    if (username == "") {
        alert("Username must be filled out");
        return false;
    }
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