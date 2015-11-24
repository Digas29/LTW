<?php
  include_once('config.php');

  try
  {
      $db = new PDO('sqlite:' . BASE_PATH . '/data/database.db');
  }
  catch(PDOException $ex)
  {
      die("Failed to connect to the database: " . $ex->getMessage());
  }
?>
