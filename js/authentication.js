$(function (){
  $("#submit").on('click' , function(){
    var email=$('#email').val();
    var password=$('#password').val();
    var postData =
    {
      "email":email,
      "password":password
    }
    $.ajax({
      type: "POST",
      url: "api/user/login.php",
      contentType: "application/json",
      data: JSON.stringify(postData),
      dataType: "json",
      success: function(data){
        if (data.error)
        alert('error');
        else {
          setCookie('token',data.token,1);
          location.href = "?page=eventManager";
        }
      },
      error: function(e){
        console.log(e);
      }
    });
  });
  $("#password").keypress(function(e) {
    if (e.keyCode == 13){
      $("#submit").click();
    }
  });



  $("#passwordRecuperation").on('click' , function(){
    var email=prompt("Please enter your email");
    if (email == true)
    {
      var newPassword = generatePassword(10);
      alert(newPassword);

      var postData =
      {
        "email":email,
        "newPassword":newPassword
      }
      $.ajax({
        type: "POST",
        url: "api/user/recoveryPassword.php",
        contentType: "application/json",
        data: JSON.stringify(postData),
        dataType: "json",
        success: function(data){
          if (data.error)
          alert('error');
          else {
            alert('Email with a new password sent');
          }
        },
        error: function(e){
          console.log(e);
        }
      });
    }
  });
});

function generatePassword(length){
  var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
  var pass = "";
  for (var x = 0; x < length; x++) {
    var i = Math.floor(Math.random() * chars.length);
    pass += chars.charAt(i);
    console.log(i + " " + pass);
  }
  return pass;
}
