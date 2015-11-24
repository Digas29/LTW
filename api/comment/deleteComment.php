<?php
  session_start();
  include_once('comment.php');
  $body = file_get_contents('php://input');
  if(isset($body)){
    $json = json_decode($body);
    deleteComment($json->id);
    $message = array('success' => 'Comment was successfully deleted');
  } else {
  $message = array('error' => 'Unexpected exit');
  }
  $JSONresponse = json_encode($message);
  echo $JSONresponse;
?>
