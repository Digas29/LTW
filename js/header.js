$(function (){
  $("#logout").on('click' , function(){
    $.get( "api/user/logout.php", function( data ) {
      if (data.error)
      alert('error');
      else{
        alert('Log out done!');
        document.cookie="token='null'";
        location.href='?page=authentication';
      }
    });
  });

  $('#search').keypress(function(e) {
    if (e.keyCode == 13) {
      var postData =
      {
        "input":$(this).val(),
        "id":$('.header').data("id")
      }
      $.ajax({
        type: "POST",
        url: "api/event/searchEvents.php",
        contentType: "application/json",
        data: JSON.stringify(postData),
        dataType: "json",
        success: function(data){
          if (data.error)
            alert('error');
          else {
            showResults(data);
            returnButton();
          }
        },
        error: function(e){
          console.log(e);
        }
      });
    }
  });
});

function showResults(data){
  var result = "<body><div class='results'>";
  if (data.length == 0){
    result += "<p>No results found!</p><button id='return'>Return</button></div></body>";
    $('div:not(.header)').remove();
    $(result).insertAfter( ".header" );
  }
  else {
    result +=  "<h3>Past events</h3><table id='resultsTablePast'><tr><th>Title</th><th>Date</th><th>Type</th><th>Privacity</th><th></th></tr></table>" +
    "<h3>Future events</h3><table id='resultsTableFuture'><tr><th>Title</th><th>Date</th><th>Type</th><th>Privacity</th><th></th></tr></table>" +
    "<p><button id='return'>Return</button></p></div></body>";
    $('div:not(.header)').remove();
    $(result).insertAfter( ".header" );
    var date = new Date();
    var currentDate=date.getFullYear()+"-"+pad(date.getMonth()+1)+"-"+pad(date.getUTCDate())+" "+pad(date.getHours())+":"+pad(date.getMinutes());
    for(var i = 0; i < data.length; i++){
      result = "<tr><td>" + data[i].title + "</td>"+
      "<td>" + data[i].eventDate + "</td>"+
      "<td>" + data[i].eventType + "</td>";
      if (data[i].isPublic == 1)
        result += "<td> Public </td>";
      else
        result += "<td> Private </td>";
      result += "<td>" + "<a href='?page=event&id=" + data[i].id + "'>See more</a>" + "</td></tr>";
      if (data[i].eventDate < currentDate)
        $("#resultsTablePast").append(result);
      else
        $("#resultsTableFuture").append(result);
    }
  }
}

function returnButton(){
  $("#return").on('click' , function(){
    location=location;
  });
}

function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}
