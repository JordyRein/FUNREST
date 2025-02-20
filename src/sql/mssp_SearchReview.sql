

drop procedure if exists mssp_SearchReview;

delimiter //

create procedure mssp_SearchReview(
   in id int
)
begin

select b.Id as 'BewertungId', 
       k.Vorname as 'KundeVorname',
       k.Nachname as 'KundeNachname',
       b.Geprueft as 'Status',
       b.Rating as 'Rating',
       b.BewertungText as 'BewertungText',
       m.Vorname as 'PrueferVorname',
       m.Nachname as 'PrueferNachname' from Bewertung b
join Kunde k on k.Id=b.KundenID
join Mitarbeiter m on m.Id=b.MitarbeiterID
where b.Id=id;

end//

delimiter ;
