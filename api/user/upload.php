<?php
  include_once('../connection.php');
  include_once('../config.php');
  session_start();
  $id = $_SESSION['id'];

  $originalFileName = BASE_PATH . "/images/originals/$id.jpg";
  $smallFileName = BASE_PATH . "/images/thumbs_small/$id.jpg";
  $mediumFileName = BASE_PATH . "/images/thumbs_medium/$id.jpg";

  move_uploaded_file($_FILES['image']['tmp_name'], $originalFileName);

  $original = imagecreatefromjpeg($originalFileName);

  $width = imagesx($original);
  $height = imagesy($original);
  $square = min($width, $height);

  // Create small square thumbnail
  $small = imagecreatetruecolor(200, 200);
  imagecopyresized($small, $original, 0, 0, ($width>$square)?($width-$square)/2:0, ($height>$square)?($height-$square)/2:0, 200, 200, $square, $square);
  imagejpeg($small, $smallFileName);

  $mediumwidth = $width;
  $mediumheight = $height;

  if ($mediumwidth > 400) {
    $mediumwidth = 400;
    $mediumheight = $mediumheight * ( $mediumwidth / $width );
  }

  $medium = imagecreatetruecolor($mediumwidth, $mediumheight);
  imagecopyresized($medium, $original, 0, 0, 0, 0, $mediumwidth, $mediumheight, $width, $height);
  imagejpeg($medium, $mediumFileName);

  $url = BASE_PATH;
  header("Location: $url");
?>
