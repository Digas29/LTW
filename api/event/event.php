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
			$stmt->execute();
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
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			return $result;
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function getEventsById($id){
		global $db;
		$stmt = $db->prepare("SELECT User.id, User.name, Event.title, Event.eventDate, Event.description, Event.eventType, Event.isPublic FROM Event, User WHERE Event.id = :id AND User.id = Event.idUser");
		try {
			$stmt->execute();
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			return $result;
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function getEventsByPrivacity($id, $isPublic){
		global $db;
		$stmt = $db->prepare("SELECT User.id, User.name, Event.title, Event.eventDate, Event.description, Event.eventType, Event.isPublic FROM Event, User, invitationList WHERE Event.id = invitationList.idEvent AND User.id = Event.idUser AND invitationList.idUser = :id AND Event.isPublic = :isPublic");
		$stmt->bindParam(':id', $id, PDO::PARAM_INT);
		$stmt->bindParam(':isPublic', $isPublic, PDO::PARAM_INT);
		try {
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			return $result;
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function getUserEvents($id){
		global $db;
		$stmt = $db->prepare("SELECT User.id, User.name, Event.title, Event.eventDate, Event.description, Event.eventType, Event.isPublic FROM Event, User, invitationList WHERE Event.id = invitationList.idEvent AND User.id = Event.idUser AND invitationList.idUser = :id");
		$stmt->bindParam(':id', $id, PDO::PARAM_INT);
		try {
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			return $result;
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}
?>
