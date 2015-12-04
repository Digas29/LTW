<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<div class="adminOptions" hidden>
  <p><b>Admin options</b></p>
  <button id='deleteEvent'>Delete</button>
  <button id='updateEvent'>Update</button>
</div>

<div class="eventInformation" data-id="<?=$_GET['id']?>">
  <p><b>Event info</b></p>
</div>

<div class="eventPhotos">
  <p><b>Event photos</b></p>
  <section id="images"></section>
  <p><form action="api/event/upload.php" method="post" enctype="multipart/form-data">
    <label>Title:
      <input type="text" name="title">
    </label>
    <input  type="number" value="<?=$_GET['id']?>" name="id" hidden>
    <input type="file" name="image">
    <input id="upload" type="submit" value="Upload">
  </form></p>
</div>

<div class="invitedUsers">
  <p><b>People invited</b></p>
  <button id='inviteUser' hidden>Invite user</button>
  <table id="inviteTable">
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th></th>
      <th></th>
    </tr>
  </table>
</div>


<div class="eventComments">
  <p><b>Comments:</b></p>
  <div class="insertComment" data-userId="1">
    <input type='text' placeholder='Comment' id='comment'>
    <button id='submit'>Submit</button>
  </div>
</div>

<div class="fb-share-button" data-href="http://google.com" data-layout="button_count"></div>

<div class="share">


  <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site http://www.website.com."
  title="Share by Email">
  <img src="http://png-2.findicons.com/files/icons/573/must_have/48/mail.png">
</a>
</div>
<script src="js/event.js"></script>
