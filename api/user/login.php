<?php
session_start();
include_once '../connection.php';
include_once 'user.php';

$body = file_get_contents('php://input');
if(isset($body)){
	$json = json_decode($body);
	$result = userAcess($json->email, $json->password);
	if(isset($result)&&!empty($result)){
		$message = array('success' => 'user login');
		$_SESSION['name'] = $result[0]['name'];
		$_SESSION['email'] = $result[0]['email'];
	}
	else{
		$message = array('error' => 'login rejected');
	}
}
else{
	$message = array('error' => 'Is not set');
}
$JSONresponse = json_encode($message);
echo $JSONresponse;
?>
