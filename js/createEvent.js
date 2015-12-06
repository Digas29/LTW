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
      createEvent();
    }
  });
});

function createEvent(){
  $("#create").on('click' , function(){
    var idUser=$('.header').data("id");
    var title=$('#title').val();
    var eventDate=$('#eventDate').val() + " " + $('#eventTime').val();
    var description=$('#description').val();
    var eventType=$('#eventType').val();
    var isPublic;
    if ($('#isPublic')[0].checked)
    isPublic = 1;
    else
    isPublic = 0;

    var currentDate=date.getFullYear()+"-"+pad(date.getMonth()+1)+"-"+pad(date.getUTCDate())+" "+pad(date.getHours())+":"+pad(date.getMinutes());
    if (title == "" || description == "" || eventType == ""){
      alert("Please complete all the fields");
      location=location;
    }
    else if (eventDate == " " || eventDate < currentDate) {
      alert("Incorrect date");
    }

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
          alert('Error');
        else {
          location.href = "?page=eventManager";
        }
      },
      error: function(e){
        console.log(e);
      }
    });
  });
}

function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}
