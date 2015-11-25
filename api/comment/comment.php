<?php
	include_once('../connection.php');

	function createComment($idEvent, $idUser, $description){
		global $db;
		$stmt = $db->prepare('INSERT INTO Comment (idEvent, idUser, description) VALUES (:idEvent, :idUser, :description)');
		$stmt->bindParam(':idEvent', $idEvent, PDO::PARAM_INT);
		$stmt->bindParam(':idUser', $idUser, PDO::PARAM_INT);
		$stmt->bindParam(':description', $description, PDO::PARAM_STR);
		try {
			$stmt->execute();
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function deleteComment($id){
		global $db;
		$stmt = $db->prepare('DELETE FROM Comment WHERE id = :id');
		$stmt->bindParam(':id', $idEvent, PDO::PARAM_INT);
		try {
			$stmt->execute();
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function updateComment($id, $description){
		global $db;
		$stmt = $db->prepare('UPDATE Comment SET id = :id, description = :description');
		$stmt->bindParam(':id', $idUser, PDO::PARAM_INT);
		$stmt->bindParam(':description', $description, PDO::PARAM_STR);
		try {
			$stmt->execute();
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}
?>
