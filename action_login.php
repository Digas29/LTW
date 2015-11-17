<?php
  session_start();                         // starts the session
  
  include_once('connection.php'); // connects to the database
  include_once('users.php');      // loads the functions responsible for the users table
 
  if (userExists($_POST['email'], $_POST['password'])) // test if user exists
    $_SESSION['email'] = $_POST['email'];            // store the username
 
  header('Location: ' . $_SERVER['HTTP_REFERER']);
?>
