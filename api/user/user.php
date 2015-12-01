<?php
	include_once('../connection.php');

	function userAcess($email, $password){
		global $db;
		$securePassword = hash("sha256", $password);
		$stmt = $db->prepare("SELECT name, email, id FROM User WHERE email = :email AND password = :securePassword");
		$stmt->bindParam(':email', $email, PDO::PARAM_STR);
		$stmt->bindParam(':securePassword', $securePassword, PDO::PARAM_STR);
		try {
      $stmt->execute();
    } catch (PDOException $e) {
      return $e->getMessage();
    }
		$result = $stmt->fetchAll();
    return $result;
	}

	function createUser($name, $birthdate, $email, $password){
		global $db;
		$stmt = $db->prepare('INSERT INTO User (name, birthdate, email, password) VALUES (:name, :birthdate, :email, :securePassword)');
		$securePassword = hash("sha256", $password);
		$stmt->bindParam(':name', $name, PDO::PARAM_STR);
		$stmt->bindParam(':birthdate', $birthdate, PDO::PARAM_STR);
		$stmt->bindParam(':email', $email, PDO::PARAM_STR);
		$stmt->bindParam(':securePassword', $securePassword, PDO::PARAM_STR);
		try {
			$stmt->execute();
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function existsUser($email){
    global $db;
    $stmt = $db->prepare('SELECT id, email FROM User WHERE email = :email');
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    try {
      $stmt->execute();
    } catch (PDOException $e) {
      return false;
    }
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if (isset($result)&&!empty($result))
    	return $result;
		else
			return false;
  }

	function getUserById($id){
		global $db;
		$stmt = $db->prepare("SELECT name, birthdate, email FROM User WHERE User.id = :id");
		$stmt->bindParam(':id', $id, PDO::PARAM_INT);
		try {
			$stmt->execute();
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			return $result;
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function updateUser($id, $name, $birthdate, $email){
		global $db;
		$stmt = $db->prepare('UPDATE User SET name = :name, birthdate = :birthdate, email = :email WHERE id = :id');
		$stmt->bindParam(':id', $id, PDO::PARAM_INT);
		$stmt->bindParam(':name', $name, PDO::PARAM_STR);
		$stmt->bindParam(':birthdate', $birthdate, PDO::PARAM_STR);
		$stmt->bindParam(':email', $email, PDO::PARAM_STR);
		try {
			$stmt->execute();
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function changePassword($id, $password){
		global $db;
		$securePassword = hash("sha256", $password);
		$stmt = $db->prepare('UPDATE User SET password = :password WHERE id = :id');
		$stmt->bindParam(':id', $id, PDO::PARAM_INT);
		$stmt->bindParam(':password', $securePassword, PDO::PARAM_STR);
		try {
			$stmt->execute();
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			return $result;
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function changePasswordByEmail($email, $password){
		global $db;
		$securePassword = hash("sha256", $password);
		$stmt = $db->prepare('UPDATE User SET password = :password WHERE email = :email');
		$stmt->bindParam(':email', $email, PDO::PARAM_STR);
		$stmt->bindParam(':password', $securePassword, PDO::PARAM_STR);
		try {
			$stmt->execute();
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			return $result;
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}

	function deleteUser($id){
		global $db;
		$stmt = $db->prepare('DELETE FROM User WHERE id = :id');
		$stmt->bindParam(':id', $id, PDO::PARAM_INT);
		try {
			$stmt->execute();
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}
?>
