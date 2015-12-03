<?php
	include_once('../connection.php');

	function createComment($idEvent, $idUser, $description, $commentDate){
		global $db;
		$stmt = $db->prepare('INSERT INTO Comment (idEvent, idUser, description, commentDate) VALUES (:idEvent, :idUser, :description, :commentDate)');
		$stmt->bindParam(':idEvent', $idEvent, PDO::PARAM_INT);
		$stmt->bindParam(':idUser', $idUser, PDO::PARAM_INT);
		$stmt->bindParam(':description', $description, PDO::PARAM_STR);
		$stmt->bindParam(':commentDate', $commentDate, PDO::PARAM_STR);
		try {
			$stmt->execute();
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function updateComment($id, $description){
		global $db;
		$stmt = $db->prepare('UPDATE Comment SET description = :description WHERE id = :id');
		$stmt->bindParam(':id', $id, PDO::PARAM_INT);
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
		$stmt->bindParam(':id', $id, PDO::PARAM_INT);
		try {
			$stmt->execute();
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function getCommentbyEventId($idEvent){
		global $db;
		$stmt = $db->prepare('SELECT Comment.id, User.name, User.id AS idUser, Comment.description, Comment.commentDate FROM Comment, User WHERE User.id = Comment.idUser AND Comment.idEvent = :idEvent');
		$stmt->bindParam(':idEvent', $idEvent, PDO::PARAM_INT);
		try {
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			return $result;
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}
?>
