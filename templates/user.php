<div class="userInformation" data-id="<?=$_GET['id']?>">
</div>

<div class="userAdmin" hidden>
  <form action="api/user/upload.php" method="post" enctype="multipart/form-data">
    <input id="file" type="file" name="image" hidden>
    <input id="upload" type="submit" value="Upload" hidden>
  </form>
  <p>
    <button id='ok' hidden>Ok</button>
    <button id='cancel' hidden>Cancel</button>
  </p>
  <p>
    <button id='deleteUser'>Delete user</button>
    <button id='updateUser'>Update user</button>
    <button id='changePasswordButton'>Change password</button>
  </p>

</div>

<script src="js/user.js"></script>
