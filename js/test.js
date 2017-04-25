alert("Hey i work - test.js");

function ajax() {
  $('form').submit(function() {
    console.log($(this).serializeArray());
    $('#result').text(JSON.stringify($(this).serializeArray()));
    return false;
  });
}