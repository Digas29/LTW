<?php
  function userExists($email, $password) {
    global $db;
    
    $stmt = $db->prepare('SELECT * FROM User WHERE email = ? AND password = ?');
    $stmt->execute(array($email, sha1($password)));  

    return $stmt->fetch() !== false;
  }
?>
