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
      getEventInfo();
      insertComment();
    }
  });
});


function insertComment(){
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
  $("#comment").keypress(function(e){
    if (e.keyCode == 13){
      $('#submit').click();
    }
  });
}



function inviteUser(){
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
}

function getEventInfo(){
  var id=$('.eventInformation').data("id");
  var postData =
  {
    "id":id,
    "idUser":$('.header').data("id")
  }
  $.ajax({
    type: "POST",
    url: "api/event/getEventById.php",
    contentType: "application/json",
    data: JSON.stringify(postData),
    dataType: "json",
    success: function(data){
      if (data.error)
        history.back();
      else {
        var res = data.eventDate.split(" ");
        var eventDate = res[0];
        var eventTime = res[1];
        var result = "<form><p><input type='text' id='title' value='" + data.title + "' readonly/></p>"
        + "<p><label for='owner'>Owner</label><input type='text' id='owner' value='" + data.name + "' readonly/></p>"
        + "<p><label for='eventDate'>Date</label><input type='date' id='eventDate' value='" + eventDate + "' readonly/></p>"
        + "<p><label for='eventTime'>Hour</label><input type='time' id='eventTime' value='" + eventTime + "' readonly/></p>"
        + "<p><label for='description'>Description</label><input type='text' id='description' value='" + data.description + "' readonly/></p>"
        + "<p><label for='eventType'>Type</label><input type='text' id='eventType' value='" + data.eventType + "' readonly/></p>";
        if (data.isPublic == 1){
          result += "<p><input type='radio' value='Public' name='isPrivate' id='isPublic' checked='1'>Public"
          + "<input type='radio' value='Private' name='isPrivate' id='isPrivate' disabled>Private</p></form>";
        }
        else {
          result += "<p><input type='radio' value='Public' name='isPrivate' id='isPublic' disabled>Public"
          + "<input type='radio' value='Private' name='isPrivate' id='isPrivate' checked='1'>Private</p></form>";
        }
        result += "<button id='ok' hidden>Ok</button> <button id='cancel' hidden>Cancel</button>";
        $(".eventInformation").append(result);
        $('.fb-share-button').attr('data-href', location.href);
        sendByMail();
        $('.eventInformation').attr('data-owner', data.id);
        $('.eventInformation').attr('data-isPublic', data.isPublic);
        if($('.header').data("id") == data.id){
          $('.adminOptions').removeAttr('hidden');
          updateEvent();
          deleteEvent();
        }
        if($('.header').data("id") == data.id || data.isPublic == 1){
          $('#inviteUser').removeAttr('hidden');
          inviteUser();
        }
      }
    },
    error: function(e){
      console.log(e);
    }
  });


  $.ajax({
    type: "POST",
    url: "api/event/getEventPhotos.php",
    contentType: "application/json",
    data: JSON.stringify(postData),
    dataType: "json",
    success: function(data){
      if (data.error)
        alert('error');
      else {
        var index = 0;
        var result = "";
        var photos = data.photos.split(";");
        var url = "";
        var urlOriginal = "";
        while (index < photos.length) {
          url = "images/events/thumbs_small/" + photos[index] +".jpg";
          urlOriginal = "images/events/originals/" + photos[index] +".jpg";
          result += "<div class='eventImg'> <img href='" + urlOriginal + "' src='" + url + "' alt='Event image' height='200' width='200'> ";
          if ($('.eventInformation').data("owner") == $('.header').data("id")){
            result += "<br> <button id='deletePhoto' data-name='" + photos[index] + "' hidden>Delete</button>";
          }
          result += "</div>";
          index++;
        }
        $("#images").append(result);
        clickImage();
        if ($('.eventInformation').data("owner") == $('.header').data("id"))
          deletePhotoButton();
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
          result += "<tr><td>" + data[index].name + "</td><td>" + data[index].email + "</td>";
          if ($('.eventInformation').data("owner") == $('.header').data("id") || data[index].idUser == $('.header').data("id"))
            result += "<td><button class='deleteInviteButton' data-id='" + data[index].id + "'>Delete</button></td>";
          else
            result += "<td></td>";
          result += "<td>" + "<a href='?page=user&id=" + data[index].idUser + "'>See more</a>" + "</td></tr>";
          index++;
        }
        $("#inviteTable").append(result);
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
          result += "<div class='singleComment' data-id='" + data[index].id + "' data-owner='"+data[index].idUser + "'>"
          + "<p>Name: " + data[index].name + "</p>"
          + "<p>Date: " + data[index].commentDate + "</p>"
          + "<p>Description: <input type='text' value='" + data[index].description + "' readonly/></p>";
          if ($('.eventInformation').data("owner") == $('.header').data("id") || $('.singleComment').data("owner") == $('.header').data("id")){
            result += "<button class='deleteCommentButton' data-id='"+data[index].id+"'>Delete</button>";
          }
          result += "</div>";
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
}

function deleteEvent(){
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
}

function updateEvent(){
  $("#updateEvent").on('click' , function(){
    $(".eventInformation input").css("border-bottom", "thin solid #ffffff");
    $("#uploadForm").show();
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
}

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
  $( ".singleComment" ).dblclick(function() {
    if ($('.singleComment').data("owner") == $('.header').data("id")) {
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
    }
  });
}

function clickImage(){
  $( "img" ).click(function() {
    showImage($(this).attr('href'));
    returnButton();
  });
}

function showImage(url){
  var result = "<body><div class='image'>";
  result += "<p><img id='image' src='" + url + "' alt='User image'></p><p><button id='return'>Return</button></p></div></body>";
  $('div:not(.header)').remove();
  $(result).insertAfter( ".header" );
}

function returnButton(){
  $("#return").on('click' , function(){
    location=location;
  });
}

function deletePhotoButton(){
  $("#deletePhoto").on('click' , function(){
    var postData = {
      "id":$('.eventInformation').data("id"),
      "name":$(this).data('name')
    }
    $.ajax({
      type: "POST",
      url: "api/event/deletePhoto.php",
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

function sendByMail(){
  $("#sendByMail").on('click' , function(){
    var email = prompt("Email to share this event:");
    var ref = "mailto:" + email + "?subject=I wanted you to see this event&amp;body=Check out this event " +  location.href;
    $('#sendByMail').attr('data-href', ref);
  });
}
