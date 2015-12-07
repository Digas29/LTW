<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>



<div class="eventInformation" data-id="<?=$_GET['id']?>">
</div>



<div class="eventPhotos">
  <div class="images"></div>
  <form id="uploadForm" action="api/event/upload.php" method="post" enctype="multipart/form-data" hidden>
    <p><label>Title: </label> <input id="title" type="text" name="title">
    <input  type="number" value="<?=$_GET['id']?>" name="id" hidden>
    <input type="file" name="image">
    <input id="upload" type="submit" value="Upload"></p>
  </form>
</div>

<div class="adminOptions" hidden>
  <button id='deleteEvent'>Delete</button>
  <button id='updateEvent'>Update</button>
</div>

<div class="invitedUsers">
  <p>People invited</p>
  <table id="inviteTable">
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th></th>
      <th></th>
    </tr>
  </table>
  <div class='button'><button id='inviteUser' hidden>Invite user</button> </div>
</div>


<div class="eventComments">
  <p>Comments</p>
  <div class="insertComment" data-userId="1">
    <input type='text' placeholder='Comment' id='comment'>
    <button id='submit'>Submit</button>
  </div>
</div>

<div class="share">
  <div class="fb-share-button" data-href="" data-layout="button_count"></div>
  <button id="sendByMail" href="" title="Share by Email">
    EMAIL
  </button>
</div>
<script src="js/event.js"></script>
