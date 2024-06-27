CREATE DATABASE game_iot;
USE game_iot;

CREATE TABLE inputButt
(
	id INT PRIMARY KEY AUTO_INCREMENT,
    input VARCHAR(10),
    atTime DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Evangelion
(
	id INT PRIMARY KEY AUTO_INCREMENT,
    direction VARCHAR(10),
    lyric VARCHAR(255)
);

CREATE TABLE Jojopart2
(
	id INT PRIMARY KEY AUTO_INCREMENT,
    direction VARCHAR(10),
    lyric VARCHAR(255)
);

INSERT INTO inputButt(input)
VALUES	('right');

INSERT INTO Evangelion(direction, lyric) VALUES 
	('down', "Press to begin! "),
	('up', 'Zankoku na tenshi no you ni '),
	('right', 'Shounen yo shinwa ni '),
    ('down', 'nareeeee '),
    ('up', '[Instrument Playing] '),
    ('left', '[Instrument Playing] '),
    ('right', '[Instrument Playing] '),
    ('left', '[Instrument Playing] '),
    ('down', 'Aoi ka'),
    ('right', 'ze ga ima Mu'),
    ('up', 'ne no doa wo ta'),
    ('left', 'taite mo '),
    ('down', 'Watashi dake wo '),
    ('up', 'tada mitsumete '),
    ('left', 'Hohoenderu '),
    ('right','anata '),
    ('up','Soto fu'),
    ('down','reru mono '),
    ('left','Motomeru koto ni '),
    ('down','muchuu de '),
    ('right','Unmei sae '),
    ('up','mada shiranai '),
    ('left','Itaike na hito'),
    ('right','miiiiii '),
    ('left','Dakedo itsuka '),
    ('up','kizuku deshou '),
    ('right','Sono senaka ni '),
    ('down','wa '),
    ('up','Haruka mirai '),
    ('left','mezasu tame no '),
    ('right','Hane ga aru ko'),
    ('left','toooo '),
    ('right','Zankoku na '),
    ('left','tenshi no TE-ZE '),
    ('up','Madobe kara '),
    ('left','yagate tobitatsu '),
    ('up','Hotobashiru '),
    ('left','atsui patosu de '),
    ('right','Omoide wo '),
    ('up','uragiru nara '),
    ('right','Kono sora wo '),
    ('down','daite kagayaku '),
    ('left','Shounen yo '),
    ('down','shinwa ni nare ');

INSERT INTO Jojopart2(direction, lyric) VALUES
	("left", "Press to begin! "),
    ("up", "[Instrument Playing] "),
    ("down", "[Instrument Playing] "),
    ("right", "[Instrument Playing] "),
    ("up", "Shiji"),
    ("left", "ma no Soko "),
    ("down", "karaaa "),
    ("right", "Mezameru sono hashiratachi toki wo "),
    ("left", "koeeee Shin"),
    ("up", "ku no chishi"),
    ("left", "o gaaa Ta"),
    ("up", "chiagaru yuuki wo "),
    ("left", "hikiawaseru "),
    ("right", "Uketsu"),
    ("left", "gu ai wo "),
    ("down", "Sadame to "),
    ("left", "yobu nara "),
    ("up", "Hohoemu me de "),
    ("right", "Tsugi no te "),
    ("up", "woooo "),
    ("down", "Yami wo "),
    ("left", "azamuite setsuna "),
    ("down", "wo kawashite Yai"),
    ("left", "ba surinuke yatsura "),
    ("right", "no suki wo tsuke "),
    ("up", "Tsuranuita omoi "),
    ("right", "ga mirai wo "),
    ("down", "hirakuuu "),
    ("up", "[Instrument Playing] "),
    ("down", "Like a Bloody Storm atsuku "),
    ("left", "Like a Bloody Stone"),
    ("right", "Ketsumyaku ni kizamareta"),
    ("up", "innen ni "),
    ("right", "Ukiagaru kiena"),
    ("down", "i hokori no kizuna"),
    ("up", "aaa~~~"),
    ("right", "nigirishi"),
    ("up", "meteeee"),
    ("left", "eee~~~~"),
    ("down", "[Instrument Playing] ");

DROP TABLE inputButt;
DROP TABLE Evangelion;
DROP TABLE Jojopart2;

SELECT * FROM inputButt;
SELECT * FROM Evangelion;
SELECT * FROM Jojopart2;

UPDATE inputButt 
SET input = ""
WHERE id = 1;
	
DELIMITER |
CREATE EVENT refreshInput
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
	UPDATE inputButt 
    SET input = "", atTime = CURTIME()
    WHERE id = 1;
END |

DROP EVENT refreshInput;