alert("Hey i work - test.js");
$(document).ready(function(){
	$("#createAccount").submit(function(){
		console.log($(this).serializeArray());
	});
});