<?php
	include_once('../connection.php');

	function createEvent($idUser, $eventDate, $description, $eventType, $isPublic){
		global $db;
		$stmt = $db->prepare('INSERT INTO Event (idUser, eventDate, description, eventType, isPublic) VALUES (?, ?, ?, ?, ?)');
		try {
			$stmt->execute(array($idUser, $eventDate, $description, $eventType, $isPublic));
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function deleteEvent($id){
		global $db;
		$stmt = $db->prepare('DELETE FROM Event WHERE id = ?');
		try {
			$stmt->execute(array($id));
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function updateEvent($id, $eventDate, $description, $eventType, $isPublic){
		global $db;
		$stmt = $db->prepare('UPDATE Event SET eventDate = ?, description = ?, eventType = ?, isPublic = ? WHERE id = ?');
		try {
			$stmt->execute(array($eventDate, $description, $eventType, $isPublic, $id);
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}
?>
