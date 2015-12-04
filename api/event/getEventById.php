<?php
  session_start();
  include_once('event.php');
  $body = file_get_contents('php://input');
  if(isset($body)){
    $json = json_decode($body);
    if (canSeeEvent($json->id, $json->idUser) == true)
      $message = getEventsById($json->id);
    else {
      $message = array('error' => 'You can not acess to this page');
    }
  } else {
  $message = array('error' => 'Unexpected exit');
  }
  $JSONresponse = json_encode($message);
  echo $JSONresponse;
?>
