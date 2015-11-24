<?php
	include_once('../connection.php');

	try {
		session_start();
		session_unset();
		session_destroy();
		$message = array('success' => 'session destroied');
	} catch(Exception $e) {
			$message = $e->getMessage();
	}
	$JSONresponse = json_encode($message);
	echo $JSONresponse;

?>
