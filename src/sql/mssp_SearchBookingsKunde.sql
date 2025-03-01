
drop procedure if exists mssp_SearchBookingsKunde;

delimiter //

create procedure mssp_SearchBookingsKunde(
   in id int
)
begin

select b.Id as 'BuchungId', 
       b.BewertungID as 'BewertungsId',
       k.Vorname as 'KundeVorname', 
       k.Nachname as 'KundeNachname',
       z.Name as 'ZimmerName', 
       b.BuchungZeitRaum as 'BuchungZeitRaum',
       b.Anreise as 'Anreisedatum',
       b.Abreise as 'Abreisedatum',
       b.Kosten as 'Preis' from Buchung b
join Kunde k on k.Id=b.KundenID
join Zimmer z on z.Id=b.ZimmerID
where b.KundenID=id;

end//

delimiter ;
