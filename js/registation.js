$(function (){
  $("#submit").on('click' , function(){
    var name=$('#name').val();
    var birthdate=$('#birthdate').val();
    var email=$('#email').val();
    var password=$('#password').val();
    var passwordConfirmation=$('#passwordConfirmation').val();
    var postData =
    {
      "name":email,
      "birthdate":birthdate,
      "email":email,
      "password":password
    }
    if (password != passwordConfirmation){
      alert('password and confirmation are diferent');
      return;
    }
    $.ajax({
      type: "POST",
      url: "api/user/userRegistation.php",
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
