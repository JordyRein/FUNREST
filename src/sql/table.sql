drop database if exists FUNREST;

create database FUNREST;
use FUNREST;

drop table if exists Zimmer;
drop table if exists Kategorie;
drop table if exists Typ;
drop table if exists Kunde;
drop table if exists Buchung;
drop table if exists Bewertung;
drop table if exists Mitarbeiter;
drop table if exists LoginDaten;

create table Zimmer(
  Id int auto_increment not null primary key,
  Name nvarchar(50),
  KategorieId int,
  Typ int,
  Bild nvarchar(255)
);

create table Kategorie(
  Id int auto_increment not null primary key,
  Name nvarchar(50),
  Preis decimal(8,2)
);

create table Typ(
  Id int auto_increment not null primary key,
  Name nvarchar(50),
  PreisScale decimal(8,2)
);

create table Kunde(
  Id int auto_increment not null primary key,
  Vorname nvarchar(255),
  Nachname nvarchar(255),
  Strasse_Nummer nvarchar(255),
  PLZ nvarchar(5),
  Stadt nvarchar(50),
  Geschlecht nvarchar(1),
  Geburstdatum date,
  Stammgast boolean,
  LoginId int
);

create table LoginDaten(
  Id int auto_increment not null primary key,
  Nutzername nvarchar(50),
  Passwort nvarchar(255)
);

create table Buchung(
  Id int auto_increment not null primary key,
  KundenID int,
  ZimmerID int,
  BuchungZeitRaum int,
  Kosten decimal,
  Anreise date,
  Abreise date,
  MitarbeiterID int
);

create table Bewertung(
  Id int auto_increment not null primary key,
  KundenID int,
  MitarbeiterID int,
  BewertungText nvarchar(255),
  Geprueft boolean
);

create table Mitarbeiter(
  Id int auto_increment not null primary key,
  Vorname nvarchar(255),
  Nachname nvarchar(255),
  Rolle nvarchar(50),
  LoginId int
);

alter table Zimmer
  Add constraint Zimmer_Kategorie foreign key (KategorieId)
  references Kategorie(Id),
  Add constraint Zimmer_Typ foreign key (Typ)
  references Typ(Id);

alter table Buchung
  add constraint Buchung_Kunde foreign key (KundenID)
  references Kunde(Id),
  add constraint Buchung_Zimmer foreign key (ZimmerID)
  references Zimmer(Id),
  add constraint Buchung_Mitarbeiter foreign key (MitarbeiterID)
  references Mitarbeiter(Id);

alter table Bewertung
  add constraint Bewertung_Kunde foreign key (KundenID)
  references Kunde(Id),
  add constraint Bewertung_Mitarbeiter foreign key (MitarbeiterID)
  references Mitarbeiter(Id);

alter table Kunde
  add constraint Login_Kunde foreign key (LoginId)
  references LoginDaten(Id);
  
alter table Mitarbeiter
  add constraint Login_Mitarbeiter foreign key (LoginId)
  references LoginDaten(Id);

insert into Kategorie(Name, Preis)
values (N'Standard', 100),
       (N'Premium', 300),
       (N'Luxus', 500);

insert into Typ(Name, PreisScale)
values (N'Einzelzimmer', 1),
       (N'Doppelzimmer', 1.5);


