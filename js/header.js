$(function (){

  $("#logout").on('click' , function(){
    $.get( "api/user/logout.php", function( data ) {
      if (data.error)
        alert('error');
      else{
        alert('Log out done!');
        document.cookie="token='null'";
        location.href='?page=authentication';
      }
    });
  });

  $('#search').keypress(function(e) {
    if (e.keyCode == 13) {
      var postData =
      {
        "input":$(this).val()
      }
      $.ajax({
        type: "POST",
        url: "api/event/searchEvents.php",
        contentType: "application/json",
        data: JSON.stringify(postData),
        dataType: "json",
        success: function(data){
          if (data.error)
            alert('error');
          else {
            console.log(data);
          }
        },
        error: function(e){
          console.log(e);
        }
      });
    }
  });

  $(document).ready(function(){
    var postData = {};
    $.ajax({
      type: "POST",
      url: "api/loginInfo.php",
      contentType: "application/json",
      data: JSON.stringify(postData),
      dataType: "json",
      success: function(data){
        $('.header').attr('data-id', data.id);
        $('a[href^="?page=user"]').attr('href', "?page=user&id=" + data.id);
      }
    });
  });

});
