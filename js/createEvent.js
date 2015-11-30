$(function (){
  $("#create").on('click' , function(){
    var idUser=2; // CORRIGIR
    var title=$('#title').val();
    var eventDate=$('#eventDate').val() + " " + $('#eventTime').val();
    var description=$('#description').val();
    var eventType=$('#eventType').val();
    var isPublic;
    if ($('#isPublic')[0].checked)
      isPublic = 1;
    else
      isPublic = 0;

    var postData =
    {
      "idUser":idUser,
      "title":title,
      "eventDate":eventDate,
      "description":description,
      "eventType":eventType,
      "isPublic":isPublic
    }
    $.ajax({
      type: "POST",
      url: "api/event/insertEvent.php",
      contentType: "application/json",
      data: JSON.stringify(postData),
      dataType: "json",
      success: function(data){
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