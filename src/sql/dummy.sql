
delete from Zimmer;
delete from Kunde;
delete from Mitarbeiter;
delete from Buchung;
delete from Bewertung;

insert into Zimmer(Name, KategorieId, Typ, Bild)
values (N'Sonnenschein',    1, 1, N'bild1'),
       (N'Mondschatten',    2, 2, N'bild2'),
       (N'Olivenhain',      1, 2, N'bild3'),
       (N'Palmenparadies',  3, 2, N'bild4'),
       (N'Bergblick',       2, 1, N'bild5'),
       (N'Himmelstürmer',   1, 1, N'bild6'),
       (N'Seebrise',        1, 2, N'bild7'),
       (N'Küstenzauber',    3, 2, N'bild7'),
       (N'Blütenzauber',    1, 2, N'bild7'),
       (N'Lichtspiel',      1, 1, N'bild7'),
       (N'Waldidyll',       2, 1, N'bild7'),
       (N'Harmonie',        2, 1, N'bild7'),
       (N'Azurblau',        3, 2, N'bild7'),
       (N'Traumfänger',     2, 2, N'bild7'),
       (N'Gemütlichkeit',   1, 1, N'bild7');

insert into LoginDaten(Nutzername, Passwort)
values  (N'joh', N'blub'),
        (N'jesus', N'Gott'),
        (N'Pasta', N'pasta');

insert into Kunde(Vorname, Nachname, Strasse_Nummer, PLZ, Stadt, Geschlecht, Geburstdatum, Stammgast, LoginId)
values (N'Anton',   N'Bringal',  N'universer_3',   88333, N'Somewhere', N'M', N'2000-1-12',0, NULL),
       (N'Fibri',   N'Lolol',    N'another_4',     2222,  N'Something', N'F', N'1999-5-12', 0, NULL),
       (N'Alin',    N'Tralala',  N'glass_2',       23123, N'Globe',     N'F', N'1980-5-31', 0, NULL),
       (N'Kastra',  N'Haishu',   N'picture_5',     12324, N'Mars',      N'F', N'1955-2-22', 0, NULL),
       (N'Painem',  N'Erehisk',  N'allround_6',    87922, N'Venus',     N'F', N'1920-5-12', 0, NULL),
       (N'Paijo',   N'Ratarul',  N'watdafa_2',     1242,  N'Pluto',     N'M', N'1933-6-30', 0, NULL),
       (N'Alfredo', N'Spagetti', N'haiha_12',      5522,  N'Aldebaran', N'M', N'1988-2-15', 0, 3),
       (N'Haitaka', N'Hazuda',   N'ouchieouch_22', 44214, N'Antares',   N'M', N'1977-6-15', 0, NULL),
       (N'Aleili',  N'Aishimi',  N'nandeyanen_2',  12341, N'Blutgang',  N'F', N'1998-1-12', 0, NULL),
       (N'Funni',   N'Very',     N'Haish_3',       7117,  N'Betelgius', N'M', N'1991-1-1', 0, NULL),
       (N'Jesus', N'VonNazareth', N'Kuhstall_1',   0001,  N'Bethlehem', N'M', N'1920-12-24', 1, 2);

insert into Mitarbeiter(Vorname, Nachname, Rolle, LoginId)
values (N'Funni',  N'Funno',  N'Admin',       NULL),
       (N'Hughes', N'Stuffi', N'Mitarbeiter', NULL),
       (N'Juxtapose', N'Blubing', N'Admin', 1);

insert into Bewertung(KundenID, MitarbeiterID, Titel, Rating, BewertungText, Geprueft)
values (2, 1,  N'Guti',              4, N'Very Good!',                                                      1),
       (3, 1,  N'Very Not GooD!',    1, N'Room smelled bad and staff was unfriendly',                       1),
       (5, 1,  N'Not Nice',          2, N'Did not like the hotel',                                          0),
       (11,3,  N'Ok',                3, N'OK',                                                              0),
       (11, 1, N'Good',              4, N'Ich hatte das große Glück, in diesem Hotel zu übernachten',       1),
       (7, 1,  N'Ciabatta',          5, N'Jeden Morgen wurde ich mit köstlichen Gerichten verwöhnt, die me',1),
       (7, 1,  N'Nicht so toll!',    2, N'Leider war mein zweiter Aufenthalt im Zimmer Palmenpara',         0),
       (7, 1,  N'Wieder besser',     3, N'Das Personal war freundlich und bemüht, aber manchmal schien d',  0);

insert into Buchung(KundenID, ZimmerID,BuchungZeitRaum, Kosten, Anreise, Abreise, MitarbeiterID, BewertungID)
values (1,   2, 22, 1500,  N'2024-5-13', N'2024-6-24', 2, NULL),
        (2,   8, 3, 1500,  N'2024-5-13', N'2024-6-24', 2, 1),
        (3,   7, 9, 1500,  N'2024-5-13', N'2024-6-24', 2, 2),
        (5,   6, 18, 1500,  N'2024-5-13', N'2024-6-24', 2, 3),
       (4,   1, 12,  500,  N'2025-2-22', N'2025-2-23', 2, NULL),
       (7,   5,  8,  700,  N'2024-4-3', N'2024-4-11',  1,    6),
       (11, 14,  5,  200,  N'2025-7-12', N'2025-7-17', 2, NULL), 
       (11, 12, 17, 1200,  N'2024-10-1', N'2024-10-18', 1,   4),
       (11,  3,  6,  500,  N'2024-6-12', N'2024-6-18', 1,    5),
       (11, 13,  3,  850,  N'2024-3-28', N'2024-3-31', 2,    NULL),
       (7,   4,  5,  450,  N'2024-8-5',  N'2024-8-10', 2,    7),
       (7,   9, 10,  870,  N'2025-2-10', N'2025-2-20', 1,    8),
       (7,   4,  3,  100,  N'2025-5-18', N'2025-5-21', 1, NULL);





