$(function (){
  $("#deleteUser").on('click' , function(){
    var id=1; // CORRIGIR --------------------------------------------------------------------------------------
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
          $.get( "api/user/logout.php", function( data ) {
            if (data.error)
            alert('error');
            else{
              alert('sucess');
              document.cookie="token='null'";
              location="?page=authetication";
            }
          })
        }
      },
      error: function(e){
        console.log(e);
      }
    });
  });

  $("#upload").on('click' , function(){
    alert("Sucess");
  });

  $("#changePassword").on('click' , function(){
    if ($('#newPassword').val() == $('#confirmNewPassword').val()){

      var id=1; // CORRIGIR --------------------------------------------------------------------------------------
      var postData =
      {
        "id":id,
        "email":$('#email').val(),
        "password":$('#password').val(),
        "newPassword":$('#newPassword').val(),
      }
      $.ajax({
        type: "POST",
        url: "api/user/changePassword.php",
        contentType: "application/json",
        data: JSON.stringify(postData),
        dataType: "json",
        success: function(data){
          if (data.error)
          alert('error');
          else {
            alert('sucess');
            location.href="?page=user";
          }
        },
        error: function(e){
          console.log(e);
        }
      });
    }
    else{
      alert("Diferent passwords");
      location=location;
    }
  });



  $(document).ready(function(){
    var id=1; // CORRIGIR --------------------------------------------------------------------------------------
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
          var result = "<form><p>Name: <input type='text' id='name' value='"+ data.name + "' readonly/></p>"
          + "<p>Birthdate: <input type='date' id='birthdate' value='"+ data.birthdate + "' readonly/></p>"
          + "<p>Email: <input type='email' id='email' value='"+ data.email + "' readonly/></p></form>"
          + "<button id='ok' hidden>Ok</button><button id='cancel' hidden>Cancel</button>";
          $(".userInformation").append(result);
        }

      },
      error: function(e){
        console.log(e);
      }
    });
  });



  $("#updateUser").on('click' , function(){
    $(':input').removeAttr('readonly');
    $(':button').removeAttr('hidden');
    $("#ok").on('click' , function(){
      var id = 1;
      var postData =
      {
        "id":id,
        "name":$('#name').val(),
        "birthdate":$('#birthdate').val(),
        "email":$('#email').val()
      }
      $.ajax({
        type: "POST",
        url: "api/user/updateUser.php",
        contentType: "application/json",
        data: JSON.stringify(postData),
        dataType: "json",
        success: function(data){
          if (data.error)
          alert('error');
          else {
            alert('sucess');
            location=location;
          }

        },
        error: function(e){
          console.log(e);
        }
      });
    });
    $("#cancel").on('click' , function(){
      location=location;
    });
  });

});
