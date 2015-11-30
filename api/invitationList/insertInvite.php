<?php
  session_start();
  include_once('invitationList.php');
  include_once('../user/user.php');
  $body = file_get_contents('php://input');
  if(isset($body)){
    $json = json_decode($body);
    $res = existsUser($json->email);
    if ($res){
      if (!checkInvite($json->idEvent, $res['id'])){
        inviteUser($json->idEvent, $res['id']);
        $message = array('success' => 'Invite was successfully inserted');
      }
      else
        $message = array('error' => 'Invite already exists');
    }
    else
      $message = array('error' => 'Email did not found');
  } else {
  $message = array('error' => 'Unexpected exit');
  }
  $JSONresponse = json_encode($message);
  echo $JSONresponse;
?>
