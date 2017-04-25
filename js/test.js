$(document).ready(function(){
     $("#donald").click(function(){
     	alert("button clicked");
    //     $.post("/users",			//URL
    //     {							//Data
    //       name: "Donald Duck",
    //       password: "Password123",
    //       email: "donald@duck.org"
    //     },
    //     function(data,status){ 		//Callback
    //         alert("Data: " + data + "\nStatus: " + status);
    //     });
    });
});

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