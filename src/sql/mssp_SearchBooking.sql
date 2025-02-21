
drop procedure if exists mssp_SearchBooking;

delimiter //

create procedure mssp_SearchBooking(
   in id int
)
begin

select b.Id as 'BuchungId', 
       k.Vorname as 'KundeVorname', 
       k.Nachname as 'KundeNachname',
       z.Name as 'ZimmerName', 
       b.BuchungZeitRaum as 'BuchungZeitRaum',
       b.Anreise as 'Anreisedatum',
       b.Abreise as 'Abreisedatum',
       b.Kosten as 'Preis',
       m.Vorname as 'PrueferVorname',
       m.Nachname as 'PrueferNachname' from Buchung b
join Kunde k on k.Id=b.KundenID
join Zimmer z on z.Id=b.ZimmerID
join Mitarbeiter m on m.Id=b.MitarbeiterID
where b.Id=id;

end//

delimiter ;
