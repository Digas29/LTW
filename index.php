<?php



$currentPage = isset($_GET['page']) ? $_GET['page'] : 'authentication';

$mandatoryLogin = array('createEvent', 'event', 'eventManager', 'user');

/*
echo "
  <script src=\"js/cookies.js\">
    checkCookie(fn);
    $.get('?page=registation', {flag: fn});
</script>";
print_r($_GET);
$flag = $_GET['flag'];
*/

/*
foreach ($mandatoryLogin as $page) {
  if ($currentPage === $page && $_SESSION['token'] === null) {
    echo "
    <script type=\"text/javascript\">
    window.alert('You are not signed in.');
    window.location.href = 'index.php';
    </script>
    ";
    $currentPage = 'authentication';
    break;
  }
}*/

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
  default:
  include 'templates/authentication.php';
  break;
}

include 'templates/footer.php';
?>
