jQuery(document).ready(function() {
  jQuery('.tabs .tab-links a').on('click', function(e)  {
    var currentAttrValue = jQuery(this).attr('href');

    // Show/Hide Tabs
    jQuery('.tabs ' + currentAttrValue).show().siblings().hide();

    // Change/remove current tab to active
    jQuery(this).parent('li').addClass('active').siblings().removeClass('active');

    e.preventDefault();
  });


  var id= $('.header').data("id");
  var postData =
  {
    "idUser":id
  }
  $.ajax({
    type: "POST",
    url: "api/event/getEventsByIdUser.php",
    contentType: "application/json",
    data: JSON.stringify(postData),
    dataType: "json",
    success: function(data){
      if (data.error)
      alert('error');
      else {
        var result = "";
        for(var i = 0; i < data.length; i++){
          result += "<tr><td>" + data[i].title + "</td>"+
          "<td>" + data[i].eventDate + "</td>"+
          "<td>" + data[i].eventType + "</td>";
          if (data[i].isPublic == 1)
            result += "<td> Public </td>";
          else
            result += "<td> Private </td>";
          result += "<td><a href='?page=event&id=" + data[i].id + "'>See more</a></td></tr>";
        }
        $("#myEventsTable").append(result);
      }
    },
    error: function(e){
      console.log(e);
    }
  });


  postData =
  {
    "idUser":id,
    "isPublic":1
  }
  $.ajax({
    type: "POST",
    url: "api/event/getEventsByPrivacity.php",
    contentType: "application/json",
    data: JSON.stringify(postData),
    dataType: "json",
    success: function(data){
      if (data.error)
      alert('error');
      else {
        var result = "";
        for(var i = 0; i < data.length; i++){
          result += "<tr><td>" + data[i].title + "</td>"+
          "<td>" + data[i].name + "</td>"+
          "<td>" + data[i].eventDate + "</td>"+
          "<td>" + data[i].eventType + "</td>"+
          "<td><a href='?page=event&id=" + data[i].id + "'>See more</a></td></tr>";
        }
        $("#publicEventsTable").append(result);
      }
    },
    error: function(e){
      console.log(e);
    }
  });

  postData =
  {
    "idUser":id,
    "isPublic":0
  }
  $.ajax({
    type: "POST",
    url: "api/event/getEventsByPrivacity.php",
    contentType: "application/json",
    data: JSON.stringify(postData),
    dataType: "json",
    success: function(data){
      if (data.error)
      alert('error');
      else {
        var result = "";
        for(var i = 0; i < data.length; i++){
          result += "<tr><td>" + data[i].title + "</td>"+
          "<td>" + data[i].name + "</td>"+
          "<td>" + data[i].eventDate + "</td>"+
          "<td>" + data[i].eventType + "</td>"+
          "<td><a href='?page=event&id=" + data[i].id + "'>See more</a></td></tr>";
        }
        $("#privateEventsTable").append(result);
      }
    },
    error: function(e){
      console.log(e);
    }
  });

  postData =
  {
    "idUser":id
  }
  $.ajax({
    type: "POST",
    url: "api/event/getUserEvents.php",
    contentType: "application/json",
    data: JSON.stringify(postData),
    dataType: "json",
    success: function(data){
      if (data.error)
      alert('error');
      else {
        var result = "";
        for(var i = 0; i < data.length; i++){
          result += "<tr><td>" + data[i].title + "</td>"+
          "<td>" + data[i].name + "</td>"+
          "<td>" + data[i].eventDate + "</td>"+
          "<td>" + data[i].eventType + "</td>";
          if (data[i].isPublic == 1)
            result += "<td> Public </td>";
          else
            result += "<td> Private </td>";
          result += "<td><a href='?page=event&id=" + data[i].id + "'>See more</a></td></tr>";
        }
        $("#allEventsTable").append(result);
      }
    },
    error: function(e){
      console.log(e);
    }
  });
});
