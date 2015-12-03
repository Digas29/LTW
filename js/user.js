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
      getUserInfo();
      if ($('.userInformation').data("id") == $('.header').data("id")){
        deleteUser();
        updateUser();
        changePassword();
      }
    }
  });
});


function deleteUser(){
  $("#deleteUser").on('click' , function(){
    var id=$('.userInformation').data("id");
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
              alert('User deleted');
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
}



function getUserInfo(){
  var id=$('.userInformation').data("id");
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
      if (data.error)
      alert('error');
      else {
        if (id == $('.header').data("id"))
        $('.userAdmin').removeAttr('hidden');
        var result = "";
        var urlSmall = "images/users/thumbs_small/" + id +".jpg";
        var urlOriginal = "images/users/originals/" + id +".jpg";
        result = "<form><p><a id='imageLink' href='" + urlOriginal + "'><img id='image' src='" + urlSmall + "' alt='User image' height='200' width='200'></a></p>"
        + "<p>Name: <input type='text' id='name' value='"+ data.name + "' readonly/></p>"
        + "<p>Birthdate: <input type='date' id='birthdate' value='"+ data.birthdate + "' readonly/></p>"
        + "<p>Email: <input type='email' id='email' value='"+ data.email + "' readonly/></p></form>"
        + "<button id='ok' hidden>Ok</button><button id='cancel' hidden>Cancel</button>";
        $(".userInformation").append(result);
        checkSrcImage(id);
      }

    },
    error: function(e){
      console.log(e);
    }
  });
}


function updateUser(){
  $("#updateUser").on('click' , function(){
    $(':input').removeAttr('readonly');
    $(':button').removeAttr('hidden');
    $("#ok").on('click' , function(){
      var id = $('.userInformation').data("id");
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
}

function changePassword(){
  $("#changePasswordButton").on('click' , function(){
    $(location).attr('href','?page=changePassword');
  });
}

function checkSrcImage(id){
  var url = "images/users/thumbs_small/" + id +".jpg";
  $.ajax({
    url:url,
    type:'HEAD',
    error: function(){
      var urlAlt = "images/users/thumbs_small/" + 0 +".jpg";
      $('#image').attr('src', urlAlt);
      $('#imageLink').removeAttr('href');
    }
  });
}
