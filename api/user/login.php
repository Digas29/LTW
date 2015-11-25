<?php
session_start();
include_once '../connection.php';
include_once 'user.php';

$body = file_get_contents('php://input');
if(isset($body)){
	$json = json_decode($body);
	$result = userAcess($json->email, $json->password);
	if(isset($result)&&!empty($result)){
		$token = md5(uniqid(rand(), true));
		$_SESSION['name'] = $result[0]['name'];
		$_SESSION['email'] = $result[0]['email'];
		$_SESSION['token'] = $token;
		$message = array('success' => 'user login','token' => $_SESSION['token']);
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
