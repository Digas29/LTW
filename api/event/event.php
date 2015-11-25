<?php
	include_once('../connection.php');

	function createEvent($idUser, $title, $eventDate, $description, $eventType, $isPublic){
		global $db;
		$stmt = $db->prepare('INSERT INTO Event (idUser, title, eventDate, description, eventType, isPublic) VALUES (:idUser, :title, :eventDate, :description, :eventType, :isPublic)');
		$stmt->bindParam(':idUser', $idUser, PDO::PARAM_INT);
		$stmt->bindParam(':title', $title, PDO::PARAM_STR);
		$stmt->bindParam(':eventDate', $eventDate, PDO::PARAM_STR);
		$stmt->bindParam(':description', $description, PDO::PARAM_STR);
		$stmt->bindParam(':eventType', $eventType, PDO::PARAM_STR);
		$stmt->bindParam(':isPublic', $isPublic, PDO::PARAM_BOOL);
		try {
			$stmt->execute(array($idUser, $title, $eventDate, $description, $eventType, $isPublic));
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function deleteEvent($id){
		global $db;
		$stmt = $db->prepare('DELETE FROM Event WHERE id = :id');
		$stmt->bindParam(':id', $id, PDO::PARAM_INT);
		try {
			$stmt->execute();
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function updateEvent($id, $title, $eventDate, $description, $eventType, $isPublic){
		global $db;
		$stmt = $db->prepare('UPDATE Event SET title = :title, eventDate = :eventDate, description = :description, eventType = :eventType, isPublic = :isPublic WHERE id = :id');
		$stmt->bindParam(':title', $title, PDO::PARAM_STR);
		$stmt->bindParam(':eventDate', $eventDate, PDO::PARAM_STR);
		$stmt->bindParam(':description', $description, PDO::PARAM_STR);
		$stmt->bindParam(':eventType', $eventType, PDO::PARAM_STR);
		$stmt->bindParam(':isPublic', $isPublic, PDO::PARAM_BOOL);
		$stmt->bindParam(':id', $id, PDO::PARAM_INT);
		try {
			$stmt->execute();
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}
	function getEventsByIdUser($idUser){
		global $db;
		$stmt = $db->prepare('SELECT * FROM Event WHERE idUser = :idUser');
		$stmt->bindParam(':idUser', $idUser, PDO::PARAM_INT);
		try {
			$stmt->execute();
			$result = $stmt->fetch();
			return $result;
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}
?>
