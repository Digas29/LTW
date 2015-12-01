<?php
  session_start();
  include_once('user.php');
  $body = file_get_contents('php://input');
  if(isset($body)){
    $json = json_decode($body);
    deleteUser($json->id);
    $message = array('success' => 'User was successfully deleted');
  } else {
  $message = array('error' => 'Unexpected exit');
  }
  $JSONresponse = json_encode($message);
  echo $JSONresponse;
?>
