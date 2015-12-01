<?php
session_start();
include_once '../connection.php';
include_once 'user.php';

$body = file_get_contents('php://input');
if(isset($body)){
	$json = json_decode($body);
	$result = existsUser($json->email);
	if(isset($result)&&!empty($result)){
		changePasswordByEmail($json->email, $json->newPassword);
		// The message
		$message = "Your new password is: " . $json->newPassword;
		// In case any of our lines are larger than 70 characters, we should use wordwrap()
		$message = wordwrap($message, 70, "\r\n");
		// Send
		mail($json->email, 'Password recovery', $message);
  	$message = array('sucess' => 'Password sucefully changed');
	}
	else {
		$message = array('error' => 'User did not exist');
	}
}
else{
	$message = array('error' => 'Is not set');
}
$JSONresponse = json_encode($message);
echo $JSONresponse;
?>
