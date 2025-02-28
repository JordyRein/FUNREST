

drop procedure if exists mssp_SearchReviewKunde;

delimiter //

create procedure mssp_SearchReviewKunde(
   in kid int
)
begin

select b.Id as 'BewertungId', 
       b.Titel as 'Titel',
       b.Geprueft as 'Status',
       b.Rating as 'Rating',
       b.BewertungText as 'BewertungText',
       g.Anreise as 'Anreise',
       g.Abreise as 'Abreise',
       z.Name as 'Zimmername' from Bewertung b
join Kunde k on k.Id=b.KundenID
join Buchung g on g.BewertungID=b.Id
join Zimmer z on z.Id=g.ZimmerID
where b.KundenID = kid;

end//

delimiter ;
