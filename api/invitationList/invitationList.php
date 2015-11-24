<?php
	include_once('../connection.php');

	function inviteUser($idEvent, $idUser){
		global $db;
		$stmt = $db->prepare('INSERT INTO InvitationList (idEvent, idUser) VALUES (?, ?)');
		try {
			$stmt->execute(array($idEvent, $idUser));
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function deleteInvite($idEvent, $idUser){
		global $db;
		$stmt = $db->prepare('DELETE FROM InvitationList WHERE idEvent = ? AND idUser = ?');
		try {
			$stmt->execute(array($idEvent, $idUser));
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}
?>
