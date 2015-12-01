<?php
session_start();
include_once '../connection.php';
include_once 'user.php';

$body = file_get_contents('php://input');
if(isset($body)){
	$json = json_decode($body);
	$result = userAcess($json->email, $json->password);
	if(isset($result)&&!empty($result)){
		changePassword($json->id, $json->newPassword);
    $message = array('sucess' => 'Password sucefully changed');
	}
	else{
		$message = array('error' => 'Incorrect password');
	}
}
else{
	$message = array('error' => 'Is not set');
}
$JSONresponse = json_encode($message);
echo $JSONresponse;
?>
