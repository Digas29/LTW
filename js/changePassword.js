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
      changePassword();
    }
  });
});



function changePassword(){
  $("#changePassword").on('click' , function(){
    if ($('#newPassword').val() != $('#confirmNewPassword').val()){
      alert("Diferent passwords");
      location=location;
    }
    if ($('#newPassword').val() == ""){
      alert("Invalid password");
      location=location;
    }
    else{
      var id=$('.header').data("id");
      var postData =
      {
        "id":id,
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
            alert('Password sucefully changed');
            location.href="?page=user&id=" + id;
          }
        },
        error: function(e){
          console.log(e);
        }
      });
    }
  });
}
