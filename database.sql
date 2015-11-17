CREATE TABLE User (
	id					INTEGER PRIMARY KEY AUTOINCREMENT,
	name				NVARCHAR2 (64) NOT NULL,
	bithdate			DATE NOT NULL,
	email				NVARCHAR2 (64) NOT NULL,
	password			NVARCHAR2 (64) NOT NULL
);

CREATE TABLE Event (
	id					INTEGER PRIMARY KEY AUTOINCREMENT,
	idUser				INTEGER NOT NULL REFERENCES User(id),
	eventDate			DATE NOT NULL,
	description			TEXT NOT NULL,
	eventType			NVARCHAR2 (64) NOT NULL,
	isPublic			BOOLEAN NOT NULL CHECK (isPublic IN (0,1))
);

CREATE TABLE InvitationList (
	idEvent				INTEGER NOT NULL REFERENCES Event(id),
	idUser				INTEGER NOT NULL REFERENCES User(id),
	UNIQUE (idEvent, idUser)
);

CREATE TABLE Comment (
	id					INTEGER PRIMARY KEY AUTOINCREMENT,
	idEvent				INTEGER NOT NULL REFERENCES Event(id),
	idUser				INTEGER NOT NULL REFERENCES User(id),
	description			TEXT
);

--$result = md5($salt.$string); var result = md5(salt+string); SALT + MD5 (salt before)
INSERT INTO User(name, bithdate, email, password) VALUES('Rui', '1994-12-01', 'rui@gmail.com', '907c7afd57be493757f13ccd1dd45dddf02db069');
INSERT INTO User(name, bithdate, email, password) VALUES('Antonio', '1995-05-11', 'antonio@gmail.com', 'a08f08bac39aeae6c9580ade7aa8387b5a0e7428');

INSERT INTO Event(idUser, eventDate, description, eventType, isPublic) VALUES(1, '2015-12-11', 'Uma cena', 'Concerto', 1);

INSERT INTO InvitationList(idEvent, idUser) VALUES(1, 1);
INSERT INTO InvitationList(idEvent, idUser) VALUES(1, 2);

INSERT INTO Comment(idEvent, idUser, description) VALUES(1, 2, 'Não vou');



