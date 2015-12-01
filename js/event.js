$(function (){
  $("#submit").on('click' , function(){
    var idEvent=$(".eventInformation").data("id");
    var idUser=$(".insertComment").data("userId");
    var description=$('#comment').val();
    var date = new Date();
    var commentDate=date.getFullYear()+"-"+pad(date.getMonth()+1)+"-"+pad(date.getUTCDate())+" "+pad(date.getHours())+":"+pad(date.getMinutes());
    var postData =
    {
      "idEvent":idEvent,
      "idUser":idUser,
      "description":description,
      "commentDate":commentDate
    }
    $.ajax({
      type: "POST",
      url: "api/comment/insertComment.php",
      contentType: "application/json",
      data: JSON.stringify(postData),
      dataType: "json",
      success: function(data){
        if (data.error)
        alert('error');
        else {
          alert('sucess');
          location=location;
        }
      },
      error: function(e){
        console.log(e);
      }
    });
  });



  $("#deleteEvent").on('click' , function(){
    var idEvent=$(".eventInformation").data("id");
    var postData =
    {
      "id":idEvent
    }
    $.ajax({
      type: "POST",
      url: "api/event/deleteEvent.php",
      contentType: "application/json",
      data: JSON.stringify(postData),
      dataType: "json",
      success: function(data){
        if (data.error)
        alert('error');
        else {
          alert('sucess');
          location=location;
        }
      },
      error: function(e){
        console.log(e);
      }
    });
  });

  $("#inviteUser").on('click' , function(){
    var email = prompt("Please guest email");
    if (email != "" && email != null){
      var idEvent=$(".eventInformation").data("id");
      var postData =
      {
        "email":email,
        "idEvent":idEvent
      }
      $.ajax({
        type: "POST",
        url: "api/invitationList/insertInvite.php",
        contentType: "application/json",
        data: JSON.stringify(postData),
        dataType: "json",
        success: function(data){
          if (data.error)
          alert(data.error);
          else {
            alert('sucess');
            location=location;
          }
        },
        error: function(e){
          console.log(e);
        }
      });
    }
    else if (email == "")
      alert("Input a valid email");
  });



  $(document).ready(function(){
    var id=$(".eventInformation").data("id");
    var postData =
    {
      "id":id
    }
    $.ajax({
      type: "POST",
      url: "api/event/getEventById.php",
      contentType: "application/json",
      data: JSON.stringify(postData),
      dataType: "json",
      success: function(data){
        if (data.error)
          alert('error');
        else {
          var result = "<p>Title: " + data.title + "</p>"
          + "<p>Owner: " + data.name + "</p>"
          + "<p>Date: " + data.eventDate + "</p>"
          + "<p>Description: " + data.description + "</p>"
          + "<p>Type: " + data.eventType + "</p>";
          if (data.isPublic)
          result += "<p>Privacity: Public</p>";
          else {
            result += "<p>Privacity: Private</p>";
          }
          $(".eventInformation").append(result);
        }
      },
      error: function(e){
        console.log(e);
      }
    });


    $.ajax({
      type: "POST",
      url: "api/invitationList/getInvitesByEventId.php",
      contentType: "application/json",
      data: JSON.stringify(postData),
      dataType: "json",
      success: function(data){
        if (data.error)
        alert('error');
        else {
          var index = 0;
          var result = "";
          while (index<data.length) {
            result += "<p>Name: " + data[index].name + " | "
            + "Email: " + data[index].email + " | "
            + "<button class='deleteInviteButton' data-id='" + data[index].id + "'>Delete</button>"
            + "</p>";
            index++;
          }
          $(".invitedUsers").append(result);
          deleteInviteButton();
        }
      },
      error: function(e){
        console.log(e);
      }
    });


    $.ajax({
      type: "POST",
      url: "api/comment/getCommentByEventId.php",
      contentType: "application/json",
      data: JSON.stringify(postData),
      dataType: "json",
      success: function(data){
        if (data.error)
        alert('error');
        else {
          var index = 0;
          var result = "";
          while (index<data.length) {
            result += "<div class=\"singleComment\"><p>Name: " + data[index].name + "</p>"
            + "<p>Description: " + data[index].description + "</p>"
            + "<p>Date: " + data[index].commentDate + "</p>"
            + "<button class='deleteCommentButton' data-id='"+data[index].id+"'>Delete</button></div>";
            index++;
          }
          $(".eventComments").append(result);
          deleteCommentButton();
        }

      },
      error: function(e){
        console.log(e);
      }
    });
  });
});

function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}

function deleteCommentButton(){
  $(".deleteCommentButton").on('click' , function(){
    var id = $(this).data("id");
    var postData =
    {
      "id":id
    }
    $.ajax({
      type: "POST",
      url: "api/comment/deleteComment.php",
      contentType: "application/json",
      data: JSON.stringify(postData),
      dataType: "json",
      success: function(data){
        if (data.error)
        alert('error');
        else {
          alert('sucess');
          location=location;
        }
      },
      error: function(e){
        console.log(e);
      }
    });
  });
}

function deleteInviteButton(){
  $(".deleteInviteButton").on('click' , function(){
    var id = $(this).data("id");
    var postData =
    {
      "id":id
    }
    $.ajax({
      type: "POST",
      url: "api/invitationList/deleteInvite.php",
      contentType: "application/json",
      data: JSON.stringify(postData),
      dataType: "json",
      success: function(data){
        if (data.error)
        alert('error');
        else {
          alert('sucess');
          location=location;
        }
      },
      error: function(e){
        console.log(e);
      }
    });
  });
}
