$("#changePassword").on('click' , function(){
  if ($('#newPassword').val() == $('#confirmNewPassword').val()){
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
  else{
    alert("Diferent passwords");
    location=location;
  }
});
