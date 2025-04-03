
drop procedure if exists mssp_CheckKundeLogin;

delimiter //

create procedure mssp_CheckKundeLogin(
   in usr nvarchar(50),
   in pw  nvarchar(255)
)
begin

select  k.Id, 
        k.Vorname, 
        k.Nachname,
        k.Strasse_Nummer,
        k.PLZ,
        k.Stadt,
        k.Geschlecht,
        k.Geburstdatum,
        k.Stammgast
        from LoginDaten l
join Kunde k on k.LoginId=l.Id
where l.Nutzername = usr and
      l.Passwort = pw;

end//

delimiter ;
