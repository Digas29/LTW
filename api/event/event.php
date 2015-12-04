<?php
	include_once('../connection.php');
	include_once('../config.php');

	function createEvent($idUser, $title, $eventDate, $description, $eventType, $isPublic){
		global $db;
		$photos = "";
		$stmt = $db->prepare('INSERT INTO Event (idUser, title, eventDate, description, eventType, isPublic, photos) VALUES (:idUser, :title, :eventDate, :description, :eventType, :isPublic, :photos)');
		$stmt->bindParam(':idUser', $idUser, PDO::PARAM_INT);
		$stmt->bindParam(':title', $title, PDO::PARAM_STR);
		$stmt->bindParam(':eventDate', $eventDate, PDO::PARAM_STR);
		$stmt->bindParam(':description', $description, PDO::PARAM_STR);
		$stmt->bindParam(':eventType', $eventType, PDO::PARAM_STR);
		$stmt->bindParam(':isPublic', $isPublic, PDO::PARAM_BOOL);
		$stmt->bindParam(':photos', $photos, PDO::PARAM_STR);
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

	function insertEventPhoto($id, $photos){
		global $db;
		$stmt = $db->prepare('UPDATE Event SET photos = :photos WHERE id = :id');
		$stmt->bindParam(':photos', $photos, PDO::PARAM_STR);
		$stmt->bindParam(':id', $id, PDO::PARAM_INT);
		try {
			$stmt->execute();
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function getEventPhotos($id){
		global $db;
		$stmt = $db->prepare('SELECT photos FROM Event WHERE id = :id');
		$stmt->bindParam(':id', $id, PDO::PARAM_INT);
		try {
			$stmt->execute();
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			return $result;
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function deletePhoto($id, $name){
		$originalFileName = BASE_PATH . "/images/events/originals/$name.jpg";
		$smallFileName = BASE_PATH . "/images/events/thumbs_small/$name.jpg";
		$result = getEventPhotos($id);


		$photos = explode(';', $result['photos']);
		$key = array_search($name,$photos);
		if($key!==false){
    	unset($photos[$key]);
			$newPhotos = implode(';', $photos);
			insertEventPhoto($id, $newPhotos);
			unlink($originalFileName);
			unlink($smallFileName);
		}
}

	function getEventsByIdUser($idUser){
		global $db;
		$stmt = $db->prepare('SELECT * FROM Event WHERE idUser = :idUser
													ORDER BY Event.eventDate');
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
		$stmt = $db->prepare("SELECT Event.id AS idEvent, User.id, User.name, Event.title, Event.eventDate, Event.description, Event.eventType, Event.isPublic
													FROM Event, User WHERE Event.id = :id AND User.id = Event.idUser
													ORDER BY Event.eventDate");
		$stmt->bindParam(':id', $id, PDO::PARAM_INT);
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
		$stmt = $db->prepare("SELECT Event.id AS idEvent, User.id, User.name, Event.title, Event.eventDate, Event.description, Event.eventType, Event.isPublic
													FROM Event, User, invitationList WHERE Event.id = invitationList.idEvent AND User.id = Event.idUser AND invitationList.idUser = :id AND Event.isPublic = :isPublic
													ORDER BY Event.eventDate");
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
		$stmt = $db->prepare("SELECT DISTINCT Event.id AS idEvent, User.name, User.id, Event.title, Event.eventDate, Event.description,
                        Event.eventType, Event.isPublic FROM Event, invitationList, User
                        WHERE User.id = Event.idUser AND ((Event.id = invitationList.idEvent AND invitationList.idUser = :id) OR Event.idUser = :id)
												ORDER BY Event.eventDate");
		$stmt->bindParam(':id', $id, PDO::PARAM_INT);
		try {
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			return $result;
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}


	function searchEvents($input, $idUser){
		global $db;
		$var = '%' . $input . '%';
		$stmt = $db->prepare("SELECT DISTINCT Event.id, Event.title, Event.eventDate, Event.description, Event.eventType, Event.isPublic
			FROM Event, invitationList
			WHERE Event.id = invitationList.idEvent AND (Event.title LIKE :input OR Event.description LIKE :input
			OR Event.eventType LIKE :input) AND (Event.isPublic = 1 OR invitationList.idUser = :idUser OR Event.idUser = :idUser)");
		$stmt->bindParam(':input', $var, PDO::PARAM_STR);
		$stmt->bindParam(':idUser', $idUser, PDO::PARAM_INT);
		try {
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			return $result;
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function canSeeEvent($idEvent, $idUser){
		global $db;
		$isPublic = 1;
		$stmt = $db->prepare("SELECT invitationList.idUser FROM Event, invitationList	WHERE ((Event.id = invitationList.idEvent AND invitationList.idUser = :idUser) OR Event.isPublic = :isPublic OR Event.idUser = :idUser) AND Event.id = :idEvent");
		$stmt->bindParam(':idEvent', $idEvent, PDO::PARAM_INT);
		$stmt->bindParam(':idUser', $idUser, PDO::PARAM_INT);
		$stmt->bindParam(':isPublic', $isPublic, PDO::PARAM_INT);
		try {
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if (count($result) > 0){
				return true;
			}
			else {
				return false;
			}
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}
?>
