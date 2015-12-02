<div class="userInformation" data-id="<?=$_GET['id']?>">
  <p><b>User info</b></p>
</div>

<div class="userAdmin" hidden>
  <p><b>Customization</b></p>
  <p>
    <button id='deleteUser'>Delete user</button>
    <button id='updateUser'>Update user</button>
    <button id='changePasswordButton'>Change password</button>
  </p>
  <form action="api/user/upload.php" method="post" enctype="multipart/form-data">
    <input type="file" name="image">
    <input id="upload" type="submit" value="Upload">
  </form>
</div>

<script src="js/user.js"></script>
