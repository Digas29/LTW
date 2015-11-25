<?php
session_start();
include_once '../connection.php';

$body = file_get_contents('php://input');
if(isset($body) && isset($_SESSION['token'])){
  try{
    $json = json_decode($body);
    if($_SESSION['token'] == $json->token)
      $message = array('success' => 'equal token');
    else
      $message = array('error' => 'token diferent');
  } catch (Exception $e) {
      $message = array('error' => 'body undefined');
  }
}
else {
  $message = array('error' => 'body undefined 2');
}
$JSONresponse = json_encode($message);
echo $JSONresponse;
?>
