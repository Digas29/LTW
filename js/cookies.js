function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function checkCookie(fn) {
    var token = getCookie('token');
    var postData =
    {
      "token":token
    }
    $.ajax({
      type: "POST",
      url: "api/user/token.php",
      contentType: "application/json",
      data: JSON.stringify(postData),
      dataType: "json",
      success: function(data){
        if (data.error)
          fn(true);
        else {
          fn(false);
        }
      },
      error: function(e){
        console.log(e);
      }
    });
}

$(document).ready(function() {
    checkCookie(function (loggedin) {
      if (loggedin == true)
        $("#logout").hide();
      else {
        $("#logout").show();
      }
    })
});


/*function validCookie() {
  checkCookie(function (loggedin) {
    if (loggedin == true)
      $("#logout").hide();
    else {
      $("#logout").show();
    }
  })
}*/
