$(function (){
  $("#logout").on('click' , function(){
    $.get( "api/user/logout.php", function( data ) {
      if (data.error)
        alert('error');
      else{
        alert('sucess');
        document.cookie="token='null'";
        location=location;
      }
    });
  });
});
