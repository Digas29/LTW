.mode columns
.headers ON
.nullvalue NULL
PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Event;
DROP TABLE IF EXISTS InvitationList;
DROP TABLE IF EXISTS Comment;


CREATE TABLE User (
	id					INTEGER PRIMARY KEY AUTOINCREMENT,
	name				NVARCHAR2 (64) NOT NULL,
	birthdate		TEXT NOT NULL,
	email				NVARCHAR2 (64) NOT NULL,
	password		NVARCHAR2 (64) NOT NULL
);

CREATE TABLE Event (
	id						INTEGER PRIMARY KEY AUTOINCREMENT,
	idUser				INTEGER NOT NULL REFERENCES User(id),
	title					NVARCHAR2 (64),
	eventDate			TEXT NOT NULL,
	description		TEXT NOT NULL,
	eventType			NVARCHAR2 (64) NOT NULL,
	isPublic			BOOLEAN NOT NULL CHECK (isPublic IN (0,1))
);

CREATE TABLE InvitationList (
	id						INTEGER PRIMARY KEY AUTOINCREMENT,
	idEvent				INTEGER NOT NULL REFERENCES Event(id),
	idUser				INTEGER NOT NULL REFERENCES User(id),
	UNIQUE (idEvent, idUser)
);

CREATE TABLE Comment (
	id							INTEGER PRIMARY KEY AUTOINCREMENT,
	idEvent					INTEGER NOT NULL REFERENCES Event(id),
	idUser					INTEGER NOT NULL REFERENCES User(id),
	description			TEXT NOT NULL,
	commentDate			TEXT NOT NULL
);

--$result = md5($salt.$string); var result = md5(salt+string); SALT + MD5 (salt before)
INSERT INTO User(name, birthdate, email, password) VALUES('Rui', '1994-12-01', 'rui@gmail.com', '8a5b4ac36aba7445422abac5ac44667da36df6bcb3b8106821612c74c5764c14');
INSERT INTO User(name, birthdate, email, password) VALUES('Antonio', '1995-05-11', 'antonio@gmail.com', '4ee3679892e6ac5a5b513eba7fd529d363d7a96508421c5dbd44b01b349cf514');

INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic) VALUES(1, 'Rui Veloso no coliseu', '2015-12-11 23:00', 'Uma cena monstuosa', 'Concerto', 1);

INSERT INTO InvitationList(idEvent, idUser) VALUES(1, 1);
INSERT INTO InvitationList(idEvent, idUser) VALUES(1, 2);
