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
          alert('sucess');
          setCookie('token',data.token,1);
          localStorage.setItem('loggedID', data.id);
          localStorage.setItem('userID', data.id);
          $(location).attr('href','?page=user');
          console.log($(location));
        }
      },
      error: function(e){
        console.log(e);
      }
    });
  });
});
