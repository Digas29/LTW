<?php
include_once('event.php');
include_once('../connection.php');
include_once('../config.php');
session_start();

$name = $_POST['title'];
$id = $_POST['id'];

$originalFileName = BASE_PATH . "/images/events/originals/$name.jpg";
$smallFileName = BASE_PATH . "/images/events/thumbs_small/$name.jpg";

move_uploaded_file($_FILES['image']['tmp_name'], $originalFileName);

$original = imagecreatefromjpeg($originalFileName);

$width = imagesx($original);
$height = imagesy($original);
$square = min($width, $height);

// Create small square thumbnail
$small = imagecreatetruecolor(200, 200);
imagecopyresized($small, $original, 0, 0, ($width>$square)?($width-$square)/2:0, ($height>$square)?($height-$square)/2:0, 200, 200, $square, $square);
imagejpeg($small, $smallFileName);

$result = getEventPhotos($id);

if ($result['photos'] == null){
  $newPhotos = $name;
  insertEventPhoto($id, $newPhotos);
}
else {
  $photos = explode(';', $result['photos']);
  if (!in_array($name, $photos))
  {
    array_push($photos, $name);
  }
  $newPhotos = implode(';', $photos);
  insertEventPhoto($id, $newPhotos);
}

$url = BASE_PATH . "index.php";
header("Location: $url");
?>
