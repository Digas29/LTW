<?php
  include_once('user.php');
  include_once('../connection.php');
  include_once('../config.php');
  session_start();
  $id = $_SESSION['id'];
  setPhoto($id);
  $originalFileName = BASE_PATH . "/images/users/originals/$id.jpg";
  $smallFileName = BASE_PATH . "/images/users/thumbs_small/$id.jpg";

  move_uploaded_file($_FILES['image']['tmp_name'], $originalFileName);

  $original = imagecreatefromjpeg($originalFileName);

  $width = imagesx($original);
  $height = imagesy($original);
  $square = min($width, $height);

  // Create small square thumbnail
  $small = imagecreatetruecolor(200, 200);
  imagecopyresized($small, $original, 0, 0, ($width>$square)?($width-$square)/2:0, ($height>$square)?($height-$square)/2:0, 200, 200, $square, $square);
  imagejpeg($small, $smallFileName);

  $url = BASE_PATH . "index.php";
  header("Location: $url");
?>
