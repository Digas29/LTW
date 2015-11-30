<div class="userInformation">
  <p><b>User info:</b></p>
  <button id='deleteUser'>Delete</button>
  <form action="api/user/upload.php" method="post" enctype="multipart/form-data">
    <input type="file" name="image">
    <input type="submit" value="Upload">
  </form>
</div>

<div class="links">
	<p><a id="link-createEvent" href="?page=createEvent">Create event</a></p>
	<p><a id="link-event" href="?page=event">Event</a></p>
	<p><a id="link-eventManager" href="?page=eventManager">Event managers</a></p>
</div>
<script src="js/user.js"></script>
