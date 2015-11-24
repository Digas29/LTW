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
        console.log(data);
        if (data.error)
        alert('error');
        else {
          alert('sucess');
        }
      },
      error: function(e){
        console.log(e);
      }
    });
  });
});
