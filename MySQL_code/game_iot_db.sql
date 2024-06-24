CREATE DATABASE game_iot;
USE game_iot;

CREATE TABLE inputButt
(
	id INT PRIMARY KEY AUTO_INCREMENT,
    input VARCHAR(10),
    atTime DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO inputButt(input, atTime)
VALUES	('right', CURTIME());

UPDATE inputButt 
SET input = "left", atTime = CURTIME()
WHERE id = 1;

SELECT * FROM inputButt;
SELECT input from inputButt;

DROP TABLE inputButt;
