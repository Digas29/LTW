$(function (){
  $("#submit").on('click' , function(){
    var name=$('#name').val();
    var birthdate=$('#birthdate').val();
    var email=$('#email').val();
    var password=$('#password').val();
    var passwordConfirmation=$('#passwordConfirmation').val();
    if (name == "" || birthdate == null || password "")
      alert("Please complete all the fields");
    else if (password != passwordConfirmation) {
      alert('Password and confirmation are diferent');
    }
    else if (is_email(element) == false) {
      alert('Wrong email format');
    }
    else {
    var postData =
    {
      "name":name,
      "birthdate":birthdate,
      "email":email,
      "password":password
    }
    $.ajax({
      type: "POST",
      url: "api/user/userRegistation.php",
      contentType: "application/json",
      data: JSON.stringify(postData),
      dataType: "json",
      success: function(data){
        if (data.error){
          alert('error');
          location=location;
        }
        else {
          $(location).attr('href','index.php?page=authentication');
        }
      },
      error: function(e){
        console.log(e);
      }
    });
  }
  });

  $("#cancel").on('click' , function(){
    $(location).attr('href','index.php?page=authentication');
  });
});

function is_email(element) {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])/.test(element);
}
