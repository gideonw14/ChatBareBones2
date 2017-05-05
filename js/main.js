//wait until the dom is loaded
// $(document).ready(function () {
//     //adds menu.html content into any "#menu" element
//     $('#menu').load('menu.html');
// });

function loadUserInfo(){
  console.log($.session.get("username"));
  var element = document.getElementById("username");
  element.innerHTML = "This here is " + $.session.get("name");
}

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
      var login = JSON.stringify($(this).serializeArray());
      login = JSON.parse(login);
      var user = {
        username: login[0].value,
        password: login[1].value
      }
      login = JSON.stringify(user);
      console.log(login);
      $.ajax({
        type: "POST",
        url: "/api/session",
        data: login,
        success: function(data, status){
          alert(user.username + " successfully logged in");
          console.log(data["session-key"]);
          $.session.set("key", data["session-key"]);
          $.session.set("name", user.username);
          console.log($.session.get("name") + "\n" + $.session.get("key"));
          console.log("wait right there");
          window.location.replace("/account");
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
    console.log($.session.get("key"));
    $.ajax({
      type: "DELETE",
      url: "/api/session",
      headers: {
          "session-key": $.session.get("key"),
          "Content-Type": "application/json"
      },
      success: function(data, status){
        alert("User logged out");
        $.session.remove("key");
        $.session.remove("username");
        window.location.replace("/index");
      },
      statusCode:{
        410: function(){
          alert("User could not be logged out - gone");
        }        
      },
    });
  });
});

function hello() {
  alert("Hello! You submit the form");
  return false;
}

//Sending a PM
$(document).ready(function(){
  $("#submit-input").submit(function(){
    var formData = JSON.stringify($(this).serializeArray());
    formData = JSON.parse(formData);
    var address = "/api/users/" + $.session.get("name") + 
    "/pm/" + formData[0].value;
    console.log(address);
    var sendMessage = JSON.stringify({
      message: formData[1].value
    });
    console.log(sendMessage);
    $.ajax({
      type: "POST",
      url: address,
      headers: {
        "session-key": $.session.get("key"),
        "Content-Type": "application/json"
      },
      data: sendMessage,
      success: function(data, status){
        console.log("message sent successfully");
      },
      statusCode:{
        404: function(){
          alert("No user named " + formData[0].value);
        }
      },
      contentType: "application/json"
    });
    console.log("wait right there");
  });
});

//Get messages
$(document).ready(function(){
  $("#refresh").submit(function(){
    var formData = JSON.stringify($(this).serializeArray());
    formData = JSON.parse(formData);
    var address = "/api/users/" + $.session.get("name") + 
    "/pm/" + formData[0].value;
    console.log(address);
    $.ajax({
      type: "GET",
      url: address,
      headers: {
        "session-key": $.session.get("key"),
        "Content-Type": "application/json"
      },
      success: function(data){
        console.log(data);
        var messageString = "";
        for(var i in data.messages){
          messageString = messageString + "FROM: " +
          data.messages[i].sender + " -> " + 
          data.messages[i].msg + "\n";
        }
        console.log(messageString);
        document.getElementById("general-chat").innerHTML = messageString;
      },
      statusCode:{
        404: function(){
          alert("No chat history with " + formData[0].value)
        }
      },
      contentType: "application/json"
    });
  });
});

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