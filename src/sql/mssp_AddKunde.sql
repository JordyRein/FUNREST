
drop procedure if exists mssp_AddKunde;

delimiter //

create procedure mssp_AddKunde(
   in fname nvarchar(50),
   in lname nvarchar(50),
   in addr nvarchar(50),
   in plz nvarchar(5),
   in loc nvarchar(50),
   in sx nvarchar(1),
   in bday nvarchar(10),
   in usr nvarchar(50),
   in pw nvarchar(50)
)
sp:begin
  
  if exists(select * from LoginDaten
            where Nutzername=usr and Passwort=pw) then
    select 'IDPASSUsed' as output;
    leave sp;
  end if;



  insert into LoginDaten(Nutzername, Passwort)
  values (usr, pw);

  set @lid = (select Id from LoginDaten
              where Nutzername=usr and Passwort=pw);
  
  insert into Kunde(Vorname,
                    Nachname,
                    Strasse_Nummer,
                    PLZ,
                    Stadt,
                    Geschlecht,
                    Geburstdatum,
                    Stammgast,
                    LoginId)
  values (fname, lname, addr, plz, loc, sx, bday, 0, @lid);

  select 'ok' as output;

end//

delimiter ;
