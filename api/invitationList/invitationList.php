<?php
	include_once('../connection.php');

	function inviteUser($idEvent, $idUser){
		global $db;
		$stmt = $db->prepare('INSERT INTO InvitationList (idEvent, idUser) VALUES (:idEvent, :idUser)');
		$stmt->bindParam(':idEvent', $idEvent, PDO::PARAM_INT);
		$stmt->bindParam(':idUser', $idUser, PDO::PARAM_INT);
		try {
			$stmt->execute();
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function deleteInvite($id){
		global $db;
		$stmt = $db->prepare('DELETE FROM InvitationList WHERE id = :id');
		$stmt->bindParam(':id', $id, PDO::PARAM_INT);
		try {
			$stmt->execute();
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function getInvitesByEventId($idEvent){
		global $db;
		$stmt = $db->prepare('SELECT User.name, User.email, InvitationList.id FROM User, InvitationList WHERE InvitationList.idEvent = :idEvent AND InvitationList.idUser = User.id');
		$stmt->bindParam(':idEvent', $idEvent, PDO::PARAM_INT);
		try {
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			return $result;
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function checkInvite($idEvent, $idUser){
    global $db;
    $stmt = $db->prepare('SELECT * FROM InvitationList WHERE idEvent = :idEvent AND idUser = :idUser');
    $stmt->bindParam(':idEvent', $idEvent, PDO::PARAM_INT);
		$stmt->bindParam(':idUser', $idUser, PDO::PARAM_INT);
    try {
      $stmt->execute();
    } catch (PDOException $e) {
      return false;
    }
		$result = $stmt->fetch(PDO::FETCH_ASSOC);
    if (isset($result)&&!empty($result))
    	return true;
		else
			return false;
  }
?>
