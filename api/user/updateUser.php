<?php
  session_start();
  include_once('user.php');
  $body = file_get_contents('php://input');
  if(isset($body)){
    $json = json_decode($body);
    updateUser($json->id, $json->name, $json->birthdate, $json->email);
    $message = array('success' => 'User was successfully updated');
  } else {
  $message = array('error' => 'Unexpected exit');
  }
  $JSONresponse = json_encode($message);
  echo $JSONresponse;
?>
