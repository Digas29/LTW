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
	havePhoto		BOOLEAN NOT NULL CHECK (havePhoto IN (0,1)),
	password		NVARCHAR2 (64) NOT NULL
);

CREATE TABLE Event (
	id						INTEGER PRIMARY KEY AUTOINCREMENT,
	idUser				INTEGER NOT NULL REFERENCES User(id),
	title					NVARCHAR2 (64),
	eventDate			TEXT NOT NULL,
	description		TEXT NOT NULL,
	eventType			NVARCHAR2 (64) NOT NULL,
	isPublic			BOOLEAN NOT NULL CHECK (isPublic IN (0,1)),
	photos				TEXT
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


INSERT INTO User(name, birthdate, email, havePhoto, password) VALUES('Rui Vilares', '1994-12-01', 'rui@gmail.com', 0, '8a5b4ac36aba7445422abac5ac44667da36df6bcb3b8106821612c74c5764c14');
INSERT INTO User(name, birthdate, email, havePhoto, password) VALUES('Antonio Ramadas', '1995-05-11', 'antonio@gmail.com', 0, '4ee3679892e6ac5a5b513eba7fd529d363d7a96508421c5dbd44b01b349cf514');
INSERT INTO User(name, birthdate, email, havePhoto, password) VALUES('Joao Guarda', '1995-08-29', 'joao@gmail.com', 0, 'ed2befb11499489e2570cb053f774b8ed93e89eddab3f78867a2a5f32c58845e');
INSERT INTO User(name, birthdate, email, havePhoto, password) VALUES('Filipe Pinto', '1921-10-14', 'filipe@gmail.com', 0, '0de5c26aeda989f4efb3883034bc62b533cb71f113c656988b0af336e73b8507');
INSERT INTO User(name, birthdate, email, havePhoto, password) VALUES('Joana Teixeira', '1945-07-13', 'joana@gmail.com', 0, '3c6efb268bde2923e4f7cbc086995f6158a606e66df45e307829e6b28f7aaf0e');
INSERT INTO User(name, birthdate, email, havePhoto, password) VALUES('Pedro Silva', '1946-01-05', 'pedro@gmail.com', 0, 'ee5cd7d5d96c8874117891b2c92a036f96918e66c102bc698ae77542c186f981');
INSERT INTO User(name, birthdate, email, havePhoto, password) VALUES('Mariana Ferreira', '1947-04-11', 'mariana@gmail.com', 0, 'a410b5bf29327087f83e5a424c32316c8da82978be253494f15cb4be2aa76484');
INSERT INTO User(name, birthdate, email, havePhoto, password) VALUES('Roberto Castro', '1954-03-29', 'roberto@gmail.com', 0, '72534c4a93ddc043fe3229ed46b1d526c4ccc747febdcd0f284f7f6057a37858');
INSERT INTO User(name, birthdate, email, havePhoto, password) VALUES('Joaquim Duarte', '1966-08-21', 'joaquim@gmail.com', 0, 'aea49802178d9b2ba8781b03a131b5523c8947200b74f6d28fd84e9ca1bdb379');
INSERT INTO User(name, birthdate, email, havePhoto, password) VALUES('Paulo Bessa', '1980-07-21', 'paulo@gmail.com', 0, '9d87609a3584d3fca24b7084dc445c5b6f5b8ac2c6db3a1fb0d3ab7ffe27e042');
INSERT INTO User(name, birthdate, email, havePhoto, password) VALUES('Ana Carneiro', '1987-09-25', 'ana@gmail.com', 0, '24d4b96f58da6d4a8512313bbd02a28ebf0ca95dec6e4c86ef78ce7f01e788ac');
INSERT INTO User(name, birthdate, email, havePhoto, password) VALUES('Jose Silva', '1993-01-10', 'jose@gmail.com', 0, '1ec4ed037766aa181d8840ad04b9fc6e195fd37dedc04c98a5767a67d3758ece');
INSERT INTO User(name, birthdate, email, havePhoto, password) VALUES('Marta Bernardo', '1996-12-11', 'marta@gmail.com', 0, 'e420eb81d1179e1d06fa9d50691b06a53b8ed79035f4d6c1d3028e9fc4e04487');
INSERT INTO User(name, birthdate, email, havePhoto, password) VALUES('Maria Lopes', '1990-06-22', 'maria@gmail.com', 0, '94aec9fbed989ece189a7e172c9cf41669050495152bc4c1dbf2a38d7fd85627');
INSERT INTO User(name, birthdate, email, havePhoto, password) VALUES('Fernando Machado', '1995-05-11', 'fernando@gmail.com', 0, '076a89c23179cedfc61171fe400ecf01fb76b9a48a68fb82dd0cd688d684d900');


INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(1, 'Rui Veloso no coliseu', '2014-12-16 22:30', 'Musica e muitas surpresas', 'Concerto', 1, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(2, 'Porto vs Benfica', '2014-01-18 20:00', 'Jogo do seculo', 'Futebol', 1, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(5, 'Manifestacao CGTP', '2015-03-03 15:00', 'Musica e muitas surpresas', 'Manifestacao', 1, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(6, 'Workshop de C++', '2015-03-09 20:30', 'Musica e muitas surpresas', 'Ensino', 0, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(8, 'Debate politico', '2015-03-31 19:10', 'Musica e muitas surpresas', 'Politica', 1, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(3, 'Tainada anual', '2015-12-11 23:00', 'Musica e muitas surpresas', 'Lazer', 1, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(4, 'Passeio de bicicleta', '2015-05-07 10:00', 'Musica e muitas surpresas', 'Lazer', 0, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(7, 'Convivio anual', '2015-12-11 08:00', 'Musica e muitas surpresas', 'Lazer', 1, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(10, 'Celebracao eucaristica', '2015-06-16 10:00', 'Musica e muitas surpresas', 'Religiao', 1, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(8, 'Exame de condução', '2015-06-25 15:15', 'Musica e muitas surpresas', 'Ensino', 1, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(9, 'Ferias no Algarve', '2015-07-31 03:00', 'Musica e muitas surpresas', 'Lazer', 0, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(11, 'Concerto dos Mundo Secreto', '2015-08-25 01:00', 'Musica e muitas surpresas', 'Concerto', 1, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(1, 'Agrival', '2015-09-22 09:20', 'Musica e muitas surpresas', 'Feira', 1, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(2, 'Feira a moda antiga', '2015-10-15 11:00', 'Musica e muitas surpresas', 'Feira', 1, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(3, 'Passeio de Minis', '2015-10-26 08:00', 'Musica e muitas surpresas', 'Convivio', 0, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(4, 'Encontro de antigo militares', '2015-11-03 18:00', 'Musica e muitas surpresas', 'Convivio', 0, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(5, 'Campanha eleitoral no Piolho', '2016-01-12 01:00', 'Musica e muitas surpresas', 'Politica', 1, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(6, 'Feup Caffe', '2016-01-26 23:00', 'Musica e muitas surpresas', 'Lazer', 1, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(7, 'Arraial de Engenharia', '2016-04-14 03:00', 'Musica e muitas surpresas', 'Lazer', 1, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(8, 'Baconal', '2016-07-26 20:00', 'Musica e muitas surpresas', 'Lazer', 1, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(9, 'Visita a Espanha', '2016-08-10 05:00', 'Musica e muitas surpresas', 'Convivio', 0, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(10, 'Cafe no Majestic', '2016-09-12 16:15', 'Musica e muitas surpresas', 'Convivio', 0, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(11, 'Caca ao javali', '2016-09-23 16:30', 'Musica e muitas surpresas', 'Desporto', 1, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(12, 'Apanha da azeitona', '2016-03-11 07:00', 'Musica e muitas surpresas', 'Trabalho', 0, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(13, 'Ida ao Parque Aquatico', '2015-02-03 09:36', 'Musica e muitas surpresas', 'Lazer', 1, "");
INSERT INTO Event(idUser, title, eventDate, description, eventType, isPublic, photos) VALUES(14, 'Quim Barreiros na queima', '2016-12-20 23:00', 'Musica e muitas surpresas', 'Concerto', 1, "");

INSERT INTO InvitationList(idEvent, idUser) VALUES(1, 2);
INSERT INTO InvitationList(idEvent, idUser) VALUES(1, 3);
INSERT INTO InvitationList(idEvent, idUser) VALUES(1, 4);
INSERT INTO InvitationList(idEvent, idUser) VALUES(1, 5);
INSERT INTO InvitationList(idEvent, idUser) VALUES(1, 6);
INSERT INTO InvitationList(idEvent, idUser) VALUES(2, 7);
INSERT INTO InvitationList(idEvent, idUser) VALUES(2, 8);
INSERT INTO InvitationList(idEvent, idUser) VALUES(2, 9);
INSERT INTO InvitationList(idEvent, idUser) VALUES(3, 10);
INSERT INTO InvitationList(idEvent, idUser) VALUES(3, 11);
INSERT INTO InvitationList(idEvent, idUser) VALUES(3, 12);
INSERT INTO InvitationList(idEvent, idUser) VALUES(4, 13);
INSERT INTO InvitationList(idEvent, idUser) VALUES(4, 14);
INSERT INTO InvitationList(idEvent, idUser) VALUES(4, 1);
INSERT INTO InvitationList(idEvent, idUser) VALUES(5, 2);
INSERT INTO InvitationList(idEvent, idUser) VALUES(6, 7);
INSERT INTO InvitationList(idEvent, idUser) VALUES(6, 9);
INSERT INTO InvitationList(idEvent, idUser) VALUES(7, 4);
INSERT INTO InvitationList(idEvent, idUser) VALUES(7, 5);
INSERT INTO InvitationList(idEvent, idUser) VALUES(8, 1);
INSERT INTO InvitationList(idEvent, idUser) VALUES(8, 2);
INSERT INTO InvitationList(idEvent, idUser) VALUES(8, 3);
INSERT INTO InvitationList(idEvent, idUser) VALUES(9, 5);
INSERT INTO InvitationList(idEvent, idUser) VALUES(9, 4);
INSERT INTO InvitationList(idEvent, idUser) VALUES(9, 10);
INSERT INTO InvitationList(idEvent, idUser) VALUES(10, 6);
INSERT INTO InvitationList(idEvent, idUser) VALUES(11, 7);
INSERT INTO InvitationList(idEvent, idUser) VALUES(11, 8);
INSERT INTO InvitationList(idEvent, idUser) VALUES(12, 9);
INSERT INTO InvitationList(idEvent, idUser) VALUES(13, 10);
INSERT INTO InvitationList(idEvent, idUser) VALUES(14, 11);
INSERT INTO InvitationList(idEvent, idUser) VALUES(15, 12);
INSERT INTO InvitationList(idEvent, idUser) VALUES(13, 13);
INSERT INTO InvitationList(idEvent, idUser) VALUES(15, 14);
INSERT INTO InvitationList(idEvent, idUser) VALUES(17, 8);
INSERT INTO InvitationList(idEvent, idUser) VALUES(16, 2);
INSERT INTO InvitationList(idEvent, idUser) VALUES(18, 3);
INSERT INTO InvitationList(idEvent, idUser) VALUES(19, 4);
INSERT INTO InvitationList(idEvent, idUser) VALUES(20, 5);
INSERT INTO InvitationList(idEvent, idUser) VALUES(21, 6);
INSERT INTO InvitationList(idEvent, idUser) VALUES(22, 7);
INSERT INTO InvitationList(idEvent, idUser) VALUES(23, 6);
INSERT INTO InvitationList(idEvent, idUser) VALUES(24, 8);
INSERT INTO InvitationList(idEvent, idUser) VALUES(25, 9);
INSERT INTO InvitationList(idEvent, idUser) VALUES(24, 10);
INSERT INTO InvitationList(idEvent, idUser) VALUES(25, 11);
INSERT INTO InvitationList(idEvent, idUser) VALUES(23, 12);
INSERT INTO InvitationList(idEvent, idUser) VALUES(22, 14);
INSERT INTO InvitationList(idEvent, idUser) VALUES(21, 13);
INSERT INTO InvitationList(idEvent, idUser) VALUES(21, 1);
INSERT INTO InvitationList(idEvent, idUser) VALUES(20, 2);
INSERT INTO InvitationList(idEvent, idUser) VALUES(19, 12);
INSERT INTO InvitationList(idEvent, idUser) VALUES(20, 13);
INSERT INTO InvitationList(idEvent, idUser) VALUES(18, 14);
INSERT INTO InvitationList(idEvent, idUser) VALUES(17, 1);
INSERT INTO InvitationList(idEvent, idUser) VALUES(16, 1);
INSERT INTO InvitationList(idEvent, idUser) VALUES(15, 3);
INSERT INTO InvitationList(idEvent, idUser) VALUES(14, 4);
INSERT INTO InvitationList(idEvent, idUser) VALUES(13, 5);
INSERT INTO InvitationList(idEvent, idUser) VALUES(12, 6);
INSERT INTO InvitationList(idEvent, idUser) VALUES(11, 14);
INSERT INTO InvitationList(idEvent, idUser) VALUES(10, 1);
INSERT INTO InvitationList(idEvent, idUser) VALUES(9, 8);
INSERT INTO InvitationList(idEvent, idUser) VALUES(8, 9);
INSERT INTO InvitationList(idEvent, idUser) VALUES(7, 10);
INSERT INTO InvitationList(idEvent, idUser) VALUES(6, 11);
INSERT INTO InvitationList(idEvent, idUser) VALUES(5, 12);
INSERT INTO InvitationList(idEvent, idUser) VALUES(4, 10);
INSERT INTO InvitationList(idEvent, idUser) VALUES(3, 13);
INSERT INTO InvitationList(idEvent, idUser) VALUES(2, 1);
INSERT INTO InvitationList(idEvent, idUser) VALUES(1, 14);

INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(1, 1, 'Sou o owner', '2015-02-03 00:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(2, 2, 'Vai ser TOP', '2015-04-08 01:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(3, 3, 'PREPARA', '2015-06-26 02:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(4, 4, 'CONFIA', '2015-11-25 03:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(5, 5, 'Grande evento', '2015-12-06 22:30');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(6, 6, 'Saudades da ultima', '2015-12-26 20:50');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(7, 7, 'Ansioso pela proxima', '2015-15-06 23:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(8, 8, 'Seus malucos', '2014-12-06 22:18');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(9, 9, 'Que equipa', '2015-09-16 20:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(10, 10, 'FEUP FEUP FEUP', '2014-01-06 16:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(11, 11, 'MOTAS', '2014-12-21 10:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(12, 12, 'Sera isto um teste?', '2013-12-06 22:16');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(13, 13, 'Gosto tanto', '2015-02-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(14, 14, 'Nao posso', '2015-02-06 22:15');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(15, 1, 'Outra vez?', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(16, 2, 'Mais um e um', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(17, 3, 'Posso perguntar uma coisa', '2015-12-06 22:20');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(18, 4, 'O Paulo vai?', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(19, 5, 'Sim Sim Sim', '2015-12-06 22:01');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(20, 6, 'surpresas', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(21, 7, 'aqui vou eu', '2015-12-06 22:56');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(22, 8, 'aqui vais tu', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(23, 9, 'Sai daqui ze', '2015-12-06 22:52');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(24, 10, 'O guedes?', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(25, 11, 'Sim Sim Sim', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(6, 12, 'Queres uma?', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(7, 13, 'Vai ser mesmo?', '2015-12-06 22:51');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(8, 14, 'FEUP', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(9, 5, 'FEUP', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(1, 6, 'PORTO', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(2, 7, 'Sim Sim Sim', '2015-12-06 22:47');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(3, 8, 'FMUP', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(4, 4, 'Sou o owner', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(5, 3, 'Sim Sim', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(10, 2, 'Sou o owner', '2015-12-06 22:24');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(11, 1, 'Sou o owner', '2014-11-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(12, 9, 'Sim', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(13, 10, 'Mais um e um', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(14, 11, 'OMG', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(15, 12, 'FEUP', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(16, 13, 'Vai ser mesmo', '2015-12-06 22:04');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(17, 14, 'Nao', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(18, 1, 'OMG', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(19, 2, 'Sou o owner', '2014-11-06 22:55');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(20, 3, 'Nao nao nao', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(21, 4, 'Posso perguntar uma coisa', '2015-12-06 22:25');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(22, 5, 'Sou', '2015-12-06 22:10');
INSERT INTO Comment(idEvent, idUser, description, commentDate) VALUES(23, 6, 'owner', '2014-11-06 22:11');
