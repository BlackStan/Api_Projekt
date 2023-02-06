-- Active: 1675682271007@@localhost@3306

use ApiDatenBank;

CREATE TABLE Haustiere(
    _id Int PRIMARY KEY AUTO_INCREMENT,
    _name VARCHAR(255) UNIQUE,
    _rasse VARCHAR(255)
);

INSERT INTO Haustiere (_name, _rasse) VALUES ('bubi', 'katze');
INSERT INTO Haustiere (_name, _rasse) VALUES ('blubbi', 'goldfisch');
INSERT INTO Haustiere (_name, _rasse) VALUES ('blaubi', 'Hund');
INSERT INTO Haustiere (_name, _rasse) VALUES ('baubi', 'Papagei');
INSERT Into Haustiere (_name, _rasse) VALUES ("Bella", "Hund");

