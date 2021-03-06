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
        history.back();
      else {
        if (id == $('.header').data("id"))
        $('.userAdmin').removeAttr('hidden');
        var idPhoto = 0;
        if (data.havePhoto == 1)
        idPhoto = id;
        var url = "images/users/thumbs_small/" + idPhoto +".jpg";
        var urlOriginal = "images/users/originals/" + idPhoto +".jpg";
        var result = "";
        result = "<form><p><input type='text' id='name' value='"+ data.name + "' readonly/></p>"
        + "<p><img href='" + urlOriginal + "' src='" + url + "' alt='User image' height='200' width='200'></p>"
        + "<p><label for='birthdate'>Birthdate</label><input type='date' id='birthdate' value='"+ data.birthdate + "' readonly/></p>"
        + "<p><label for='email'>Email</label><input type='email' id='email' value='"+ data.email + "' readonly/></p></form>";
        $(".userInformation").append(result);
        clickImage();
      }
    },
    error: function(e){
      console.log(e);
    }
  });
}


function updateUser(){
  $("#updateUser").on('click' , function(){
    $(".userInformation input").css("border-bottom", "thin solid #ffffff");
    $("#file").show();
    $("#upload").show();
    $(':input').removeAttr('readonly');
    $(':button').removeAttr('hidden');
    $("#ok").on('click' , function(){
      var id = $('.userInformation').data("id");
      var name = $('#name').val();
      var email = $('#email').val();
      if (name == ""){
        alert("Wrong name");
        location=location;
      }
      if (is_email(email) == false){
        alert("Wrong email");
        location=location;
      }
      else {
        var postData =
        {
          "id":id,
          "name":name,
          "birthdate":$('#birthdate').val(),
          "email":email
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
      }
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

function clickImage(){
  $( "img" ).click(function() {
    showImage($(this).attr('href'));
    returnButton();
  });
}

function showImage(url){
  var result = "<body><div class='image'>";
  result += "<p><img id='image' src='" + url + "' alt='User image'></p><p><button id='return'>Return</button></p></div></body>";
  $('div:not(.header)').remove();
  $(result).insertAfter( ".header" );
}

function returnButton(){
  $("#return").on('click' , function(){
    location=location;
  });
}

function is_email(element) {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])/.test(element);
}
