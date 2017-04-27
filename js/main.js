// $document.ready(function(){
//   $('#login').submit(function(){
//     alert("Login form submit");
//     $.get()
//   });
// });

//wait until the dom is loaded
$(document).ready(function () {
    //adds menu.html content into any "#menu" element
    $('#menu').load('menu.html');
});

//Donald Duck Feature
$(document).ready(function(){
     $("#donald").click(function(){
        $.ajax({
          type: "POST",
          url: "/api/users",
          data: JSON.stringify({
            username:"Donald Duck",
            password:"password123",
            email:   "donald@duck.com"
          }),
          success: function(data, status){
            alert("Donald has been registered.");
          },
          statusCode:{
            409: function(){
              alert("Username already taken");
            }
          },
          contentType: "application/json"
        });
    });
});

//Derpy functions I stole from W3 schools
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