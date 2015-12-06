<?php
include_once('api/config.php');

session_start();

$currentPage = isset($_GET['page']) ? $_GET['page'] : 'authentication';

$mandatoryLogin = array('createEvent', 'event', 'eventManager', 'user', 'changePassword');

foreach ($mandatoryLogin as $page) {
  if ($currentPage === $page && $_SESSION['token'] === null) {
    header('Location: '. BASE_PATH);
    $currentPage = 'authentication';
    break;
  }
}

if(isset($_SESSION['token']) && $currentPage == 'authentication'){
  $currentPage = 'eventManager';
}

include 'templates/header.php';

switch ($currentPage) {
  case 'authentication':
  include 'templates/authentication.php';
  break;
  case 'registation':
  include 'templates/registation.php';
  break;
  case 'createEvent':
  include 'templates/createEvent.php';
  break;
  case 'eventManager':
  include 'templates/eventManager.php';
  break;
  case 'user':
  include 'templates/user.php';
  break;
  case 'event':
  include 'templates/event.php';
  break;
  case 'changePassword':
  include 'templates/changePassword.php';
  break;
  default:
  include 'templates/authentication.php';
  break;
}

include 'templates/footer.php';
?>
