$(function (){
  $("#submit").on('click' , function(){
    var idEvent=$('.eventInformation').data("id");
    var idUser=$('.header').data("id");
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
          location=location;
        }
      },
      error: function(e){
        console.log(e);
      }
    });
  });



  $("#deleteEvent").on('click' , function(){
    var idEvent=$('.eventInformation').data("id");
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
      var idEvent=$('.eventInformation').data("id");
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
            alert("Error");
          else {
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
    var id=$('.eventInformation').data("id");
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
          var res = data.eventDate.split(" ");
          var eventDate = res[0];
          var eventTime = res[1];
          var result = "<form><p>Title: <input type='text' id='title' value='" + data.title + "' readonly/></p>"
          + "<p>Owner: <input type='text' id='owner' value='" + data.name + "' readonly/></p>"
          + "<p>Date: <input type='date' id='eventDate' value='" + eventDate + "' readonly/></p>"
          + "<p>Hour: <input type='time' id='eventTime' value='" + eventTime + "' readonly/></p>"
          + "<p>Description: <input type='text' id='description' value='" + data.description + "' readonly/></p>"
          + "<p>Type: <input type='text' id='eventType' value='" + data.eventType + "' readonly/></p>";
          if (data.isPublic == 1){
            result += "<p><input type='radio' value='Public' name='isPrivate' id='isPublic' checked='1'>Public"
            + "<input type='radio' value='Private' name='isPrivate' id='isPrivate' disabled>Private</p></form>";
          }
          else {
            result += "<p><input type='radio' value='Public' name='isPrivate' id='isPublic' disabled>Public"
            + "<input type='radio' value='Private' name='isPrivate' id='isPrivate' checked='1'>Private</p></form>";
          }
          result += "<button id='ok' hidden>Ok</button><button id='cancel' hidden>Cancel</button>";
          $(".eventInformation").append(result);
          if($('.header').data("id") == data.id)
            $('.adminOptions').removeAttr('hidden');
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
            result += "<div class='singleComment' data-id='" + data[index].id + "'>"
            + "<p>Name: " + data[index].name + "</p>"
            + "<p>Date: " + data[index].commentDate + "</p>"
            + "<p>Description: <input type='text' value='" + data[index].description + "' readonly/></p>"
            + "<button class='deleteCommentButton' data-id='"+data[index].id+"'>Delete</button></div>";
            index++;
          }
          $(".eventComments").append(result);
          deleteCommentButton();
          updateComment();
        }

      },
      error: function(e){
        console.log(e);
      }
    });
  });


  $("#updateEvent").on('click' , function(){
    $(':input:not(#owner)').removeAttr('readonly');
    $(':button').removeAttr('hidden');
    $('#isPublic').removeAttr('disabled');
    $('#isPrivate').removeAttr('disabled');
    $("#ok").on('click' , function(){
      var id = $('.eventInformation').data("id");
      var eventDate = $('#eventDate').val() + " " + $('#eventTime').val();
      var isPublic = 0;
      if ($('#isPublic')[0].checked)
      isPublic = 1;
      else
      isPublic = 0;

      var postData =
      {
        "id":id,
        "title":$('#title').val(),
        "eventDate":eventDate,
        "description":$('#description').val(),
        "eventType":$('#eventType').val(),
        "isPublic":isPublic
      }
      $.ajax({
        type: "POST",
        url: "api/event/updateEvent.php",
        contentType: "application/json",
        data: JSON.stringify(postData),
        dataType: "json",
        success: function(data){
          if (data.error)
            alert('error');
          else {
            location=location;
          }

        },
        error: function(e){
          console.log(e);
        }
      });
    });
    $("#cancel").on('click' , function(){
      location=location;
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
          location=location;
        }
      },
      error: function(e){
        console.log(e);
      }
    });
  });
}


function updateComment(){
  // FAZER VERIFICAÇAO ______________________________________________________________________________________
  $( ".singleComment" ).dblclick(function() {
    var id = $(this).data("id");
    var comment = '.singleComment[data-id="' + id + '"] input';
    $(comment).removeAttr('readonly');
    $(comment).keypress(function(e) {
      if (e.keyCode == 13) {
        var description = $(this).val();
        var postData =
        {
          "id":id,
          "description":description
        }
        $.ajax({
          type: "POST",
          url: "api/comment/updateComment.php",
          contentType: "application/json",
          data: JSON.stringify(postData),
          dataType: "json",
          success: function(data){
            if (data.error)
              alert('error');
            else {
              location=location;
            }
          },
          error: function(e){
            console.log(e);
          }
        });
      }
    });
    $('html').click(function() {
      location=location;
    });
  });
}
