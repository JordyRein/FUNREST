

drop procedure if exists mssp_EditKunde;

delimiter //

create procedure mssp_EditKunde(
   in id int,
   in fname nvarchar(50),
   in lname nvarchar(50),
   in addr nvarchar(50),
   in plz nvarchar(5),
   in loc nvarchar(50),
   in sx nvarchar(1),
   in bday nvarchar(10)
)
begin

 update Kunde k
 set  Vorname = fname,
      Nachname = lname,
      Strasse_Nummer = addr,
      PLZ = plz,
      Stadt = loc,
      Geschlecht = sx,
      Geburstdatum = bday
  where k.Id = id;

end//

delimiter ;
