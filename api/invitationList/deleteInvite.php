<?php
  session_start();
  include_once('invitationList.php');
  $body = file_get_contents('php://input');
  if(isset($body)){
    $json = json_decode($body);
    deleteInvite($json->id);
    $message = array('success' => 'Invite was successfully deleted');
  } else {
  $message = array('error' => 'Unexpected exit');
  }
  $JSONresponse = json_encode($message);
  echo $JSONresponse;
?>
