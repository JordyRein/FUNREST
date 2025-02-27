
drop procedure if exists mssp_AddBooking;

delimiter //

create procedure mssp_AddBooking(
  in kid int,
  in zid int,
  in anreise date,
  in abreise date,
  in mid int
)
begin

  set @bzr = select datediff(abreise, anreise);
  
  set @cost = select k.Preis*t.PreisScale from Zimmer z
              join Kategorie k on k.Id=z.KategorieId
              join Typ t on t.Id = z.Typ
              where z.Id=zid;

  insert into Buchung(KundenID, 
                      ZimmerID, 
                      BuchungZeitRaum, 
                      Kosten,
                      Anreise,
                      Abreise,
                      MitarbeiterID)
  values(kid, zid, @bzr, @cost, anreise, abreise, mid);

end//

delimiter ;
