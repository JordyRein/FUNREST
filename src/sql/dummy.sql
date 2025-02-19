
delete from Zimmer;
delete from Kunde;
delete from Mitarbeiter;
delete from Buchung;
delete from Bewertung;

insert into Zimmer(KategorieId, Typ, Bild)
values (1, 1, N'bild1'),
       (2, 2, N'bild2'),
       (1, 2, N'bild3'),
       (3, 2, N'bild4'),
       (2, 1, N'bild5'),
       (1, 1, N'bild6'),
       (3, 1, N'bild7');

insert into Kunde(Vorname, Nachname, Strasse_Nummer, PLZ, Stadt, Geschlecht, Geburstdatum, Stammgast, LoginId)
values (N'Anton',   N'Bringal',  N'universer_3',   88333, N'Somewhere', N'M', N'2000-1-12',0, NULL),
       (N'Fibri',   N'Lolol',    N'another_4',     2222,  N'Something', N'F', N'1999-5-12', 0, NULL),
       (N'Alin',    N'Tralala',  N'glass_2',       23123, N'Globe',     N'F', N'1980-5-31', 0, NULL),
       (N'Kastra',  N'Haishu',   N'picture_5',     12324, N'Mars',      N'F', N'1955-2-22', 0, NULL),
       (N'Painem',  N'Erehisk',  N'allround_6',    87922, N'Venus',     N'F', N'1920-5-12', 0, NULL),
       (N'Paijo',   N'Ratarul',  N'watdafa_2',     1242,  N'Pluto',     N'M', N'1933-6-30', 0, NULL),
       (N'Alfredo', N'Spagetti', N'haiha_12',      5522,  N'Aldebaran', N'M', N'1988-2-15', 0, NULL),
       (N'Haitaka', N'Hazuda',   N'ouchieouch_22', 44214, N'Antares',   N'M', N'1977-6-15', 0, NULL),
       (N'Aleili',  N'Aishimi',  N'nandeyanen_2',  12341, N'Blutgang',  N'F', N'1998-1-12', 0, NULL),
       (N'Funni',   N'Very',     N'Haish_3',       7117,  N'Betelgius', N'M',  N'1991-1-1', 0, NULL);

insert into Mitarbeiter(Vorname, Nachname, Rolle, LoginId)
values (N'Funni',  N'Funno',  N'Admin',       NULL),
       (N'Hughes', N'Stuffi', N'Mitarbeiter', NULL);

insert into Buchung(KundenID, ZimmerID,BuchungZeitRaum, Kosten, Anreise, Abreise, MitarbeiterID)
values (1, 2, 22, 1500, N'2024-5-13', N'2024-6-24', 2),
       (4, 1, 12, 500,  N'2025-2-22', N'2024-2-23', 2);

insert into Bewertung(KundenID, MitarbeiterID, BewertungText, Geprueft)
values (2, 1, N'Very Good!', 1),
       (3, 1, N'Very Not GooD!', 1),
       (5, 1, N'Not Nice', 0);
