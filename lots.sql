CREATE TABLE Lots (
    Lot_ID int(11) NOT NULL,
    TotalSpaces int NOT NULL,
    PRIMARY KEY (Lot_ID)
);  

CREATE TABLE Lot_Records (
	Record_ID int(11) NOT NULL AUTO_INCREMENT,
	Lot_ID int(11) NOT NULL,
	Total_Spaces_Avail int(11) NOT NULL,
	Time_Stamp datetime NOT NULL,
	PRIMARY KEY(Record_ID),
	FOREIGN KEY(Lot_ID) REFERENCES Lots(Lot_ID)
);

INSERT INTO Lots(Lot_ID, TotalSpaces)
VALUES (1, 6);

