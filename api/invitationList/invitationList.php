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

	function deleteInvite($idEvent, $idUser){
		global $db;
		$stmt = $db->prepare('DELETE FROM InvitationList WHERE idEvent = :idEvent AND idUser = :idUser');
		$stmt->bindParam(':idEvent', $idEvent, PDO::PARAM_INT);
		$stmt->bindParam(':idUser', $idUser, PDO::PARAM_INT);
		try {
			$stmt->execute();
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}
?>
