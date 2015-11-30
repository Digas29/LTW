<?php
  session_start();
  include_once('user.php');
  $body = file_get_contents('php://input');
  if(isset($body)){
    $json = json_decode($body);
    if (existsUser($json->email))
      $message = array('error' => 'User already exists');
    else{
      createUser($json->name, $json->birthdate, $json->email, $json->password);
      $message = array('success' => 'User was successfully created');
    }
  } else {
    $message = array('error' => 'Inexistent request');
  }
  $JSONresponse = json_encode($message);
  echo $JSONresponse;
?>
