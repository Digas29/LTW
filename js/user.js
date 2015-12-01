$(function (){
  $("#deleteUser").on('click' , function(){
    var id = localStorage.getItem('userID');
    var postData =
    {
      "id":id
    }
    $.ajax({
      type: "POST",
      url: "api/user/deleteUser.php",
      contentType: "application/json",
      data: JSON.stringify(postData),
      dataType: "json",
      success: function(data){
        if (data.error)
        alert('error');
        else {
          alert('sucess');
          $.get( "api/user/logout.php", function( data ) {
            if (data.error)
            alert('error');
            else{
              alert('sucess');
              document.cookie="token='null'";
              location=location;
            }
          })
        }
      },
      error: function(e){
        console.log(e);
      }
    });
  });

  $(document).ready(function(){
    var id = localStorage.getItem('userID');
    var postData =
    {
      "id":id
    }
    $.ajax({
      type: "POST",
      url: "api/user/getUserById.php",
      contentType: "application/json",
      data: JSON.stringify(postData),
      dataType: "json",
      success: function(data){
        //validCookie();
        if (data.error)
        alert('error');
        else {
          var result = "<p>Name: " + data.name + "</p>"
          + "<p>Birthdate: " + data.birthdate + "</p>"
          + "<p>Email: " + data.email + "</p>";
          $(".userInformation").append(result);
        }

      },
      error: function(e){
        console.log(e);
      }
    });
  });
});
