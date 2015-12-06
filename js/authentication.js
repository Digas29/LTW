$(function (){
  $("#submit").on('click' , function(){
    var email=$('#email').val();
    var password=$('#password').val();
    if (is_email(email) == false){
      alert("Enter a correct email");
      location = location;
    }
    else if (password == ""){
      alert("Enter a password");
      location = location;
    }
    else{
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
            alert('Email/Password incorrect');
          else {
            setCookie('token',data.token,1);
            location.href = "?page=eventManager";
          }
        },
        error: function(e){
          console.log(e);
        }
      });
    }
  });


  $("#password").keypress(function(e) {
    if (e.keyCode == 13){
      $("#submit").click();
    }
  });



  $("#passwordRecuperation").on('click' , function(){
    var email=prompt("Please enter your email");
    if (is_email(email) == true)
    {
      var newPassword = generatePassword(10);
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
            alert('Error');
          else {
            alert('Email with a new password sent');
          }
        },
        error: function(e){
          console.log(e);
        }
      });
    }
    else if (email == null) {}
    else {
      alert('Insert a valid email');
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

function is_email(element) {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])/.test(element);
}
