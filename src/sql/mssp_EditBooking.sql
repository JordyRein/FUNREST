
drop procedure if exists mssp_EditBooking;

delimiter //

create procedure mssp_EditBooking(
   in id int,
   in kid int,
   in zid int,
   in anr date,
   in abr date,
   in mid int,
   in bid int
begin

 update Buchung b
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
