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

SELECT * FROM inputButt

DELIMITER //
CREATE PROCEDURE orderInput ()
BEGIN
	DECLARE sumInput int;
    SET sumInput = (SELECT COUNT(id) FROM inputButt);
	
    IF sumInput > 10 THEN 
		DELETE FROM inputButt LIMIT 10;
    END IF;
    
	SELECT *
    FROM inputButt
    ORDER BY id DESC
    LIMIT 1;
END;

CALL orderInput;

DROP PROCEDURE orderInput;