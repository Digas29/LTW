<?php
	include_once('../connection.php');

	function createComment($idEvent, $idUser, $description){
		global $db;
		$stmt = $db->prepare('INSERT INTO Comment (idEvent, idUser, description) VALUES (?, ?, ?)');
		try {
			$stmt->execute(array($idEvent, $idUser, $description));
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function deleteComment($id){
		global $db;
		$stmt = $db->prepare('DELETE FROM Comment WHERE id = ?');
		try {
			$stmt->execute(array($id));
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function updateComment($id, $description){
		global $db;
		$stmt = $db->prepare('UPDATE Comment SET id = ?, description = ?');
		try {
			$stmt->execute(array($id, $description);
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}
?>
