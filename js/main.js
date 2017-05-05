//wait until the dom is loaded
// $(document).ready(function () {
//     //adds menu.html content into any "#menu" element
//     $('#menu').load('menu.html');
// });

// Donald Duck Feature
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

// User Registration
$(document).ready(function(){
  $("#register").on("submit", function(){
    // This will get all the input from the form into an array
    var data = JSON.stringify($(this).serializeArray());
    data = JSON.parse(data);
    var user = {
      username: data[0].value,
      password: data[1].value,
      email: data[2].value
    }
    data = JSON.stringify(user);
    $.ajax({
      type: "POST",
      url: "/api/users",
      data: data,
      success: function(){
        alert(user.username + " successfully registered.");
        window.location.replace("/login")
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

//User Login
$(document).ready(function(){
  $("#login").submit(function(){
    if(!($.session.get("key") == "")){
      var data = JSON.stringify($(this).serializeArray());
      data = JSON.parse(data);
      var user = {
        username: data[0].value,
        password: data[1].value
      }
      data = JSON.stringify(user);
      console.log(data);
      $.ajax({
        type: "POST",
        url: "/api/session",
        data: data,
        success: function(data, status){
          alert(user.username + " successfully logged in");
          $.session.set("key", data);
          $.session.set("name", user.username);
          window.location.replace("/index");
        },
        statusCode:{
          422: function(){
            alert("Incorrect username or password");
          }
        },
        contentType: "application/json"
      });
    }
    else{
      alert("Already logged in!");
    }
  });
});

// User Logout
$(document).ready(function(){
  $("#logout").click(function(){
    $.ajax({
      type: "DELETE",
      url: "/api/session",
      data: $.session.get("key"),
      success: function(data, status){
        alert("User logged out");
        $.session.remove("key");
      },
      // statusCode:{

      // },
      contentType: "application/json"
    });
  });
});

function hello() {
  alert("Hello! You submit the form");
  return false;
}

//=======================================
// Derpy functions I stole from W3 schools
//=======================================
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

//=======================================
// Chat functionality
//=======================================

//send message
$(document).ready(function(){
  $("#register").on("submit", function(){
    // This will get all the input from the form into an array
    var data = JSON.stringify($(this).serializeArray());
    data = JSON.parse(data);
    var message = data[0].value;

    data = JSON.stringify(message);
    alert(message);
    $.ajax({
      type: "POST",
      url: "/api/message",
      data: data,
      },
      contentType: "application/json"
    });
  });