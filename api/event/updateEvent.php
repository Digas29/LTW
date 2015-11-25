<?php
  session_start();
  include_once('event.php');
  $body = file_get_contents('php://input');
  if(isset($body)){
    $json = json_decode($body);
    updateEvent($json->id, $json->title, $json->eventDate, $json->description, $json->eventType, $json->isPublic);
    $message = array('success' => 'Event was successfully updated');
  } else {
  $message = array('error' => 'Unexpected exit');
  }
  $JSONresponse = json_encode($message);
  echo $JSONresponse;
?>
