
drop procedure if exists mssp_EditBooking;

delimiter //

create procedure mssp_EditBooking(
   in id int,
   in kid int,
   in zname nvarchar(50),
   in anr date,
   in abr date,
   in mid int
)
begin

 set @zid = (select z.Id from Zimmer z
             where z.Name=zname);

 set @bzr = (select datediff(abr, anr));

 set @kosten = (select t.PreisScale * k.Preis from Buchung b
               join Zimmer z on z.Id=b.ZimmerID
               join Typ t on t.Id = z.Typ
               join Kategorie k on k.Id=z.KategorieId
               where b.Id=id);

 set FOREIGN_KEY_CHECKS=0;

 update Buchung b
 set  KundenID=kid,
      ZimmerID=@zid,
      Anreise=anr,
      Abreise=abr,
      MitarbeiterID=mid,
      BuchungZeitRaum=@bzr,
      Kosten=@kosten
  where b.Id = id;

 set FOREIGN_KEY_CHECKS=1;

  select N'ok' as output;

end//

delimiter ;
