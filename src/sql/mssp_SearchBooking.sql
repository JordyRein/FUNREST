
drop procedure if exists mssp_SearchBooking;

delimiter //

create procedure mssp_SearchBooking(
   in id int
)
begin

select b.Id as 'BuchungId', 
       k.Vorname as 'Kunde Vorname', 
       k.Nachname as 'Kunde Nachname',
       z.id as 'ZimmerId', 
       m.Vorname as 'Pruefer Vorname',
       m.Nachname as 'Pruefer Nachname' from Buchung b
join Kunde k on k.Id=b.KundenID
join Zimmer z on z.Id=b.ZimmerID
join Mitarbeiter m on m.Id=b.MitarbeiterID
where b.Id=id;

end//

delimiter ;
