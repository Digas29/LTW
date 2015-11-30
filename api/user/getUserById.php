<?php
  session_start();
  include_once('user.php');
  $body = file_get_contents('php://input');
  if(isset($body)){
    $json = json_decode($body);
    $message = getUserById($json->id);
  } else {
  $message = array('error' => 'Unexpected exit');
  }
  $JSONresponse = json_encode($message);
  echo $JSONresponse;
?>
