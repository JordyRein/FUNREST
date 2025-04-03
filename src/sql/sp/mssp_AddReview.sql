
drop procedure if exists mssp_AddReview;

delimiter //

create procedure mssp_AddReview(
   in id int,
   in rate int,
   in titel nvarchar(50),
   in text nvarchar(255),
   in bId int
)
begin

insert into Bewertung (KundenID, MitarbeiterID, Titel, Rating, BewertungText, Geprueft) values (
   id,
   NULL,
   titel,
   rate,
   text,
   0
);

set @neueBewertungsID = (select b.Id from Bewertung b where b.KundenID = id and b.Rating = rate and b.Titel = titel and b.BewertungText = text limit 1);
select @neueBewertungsID as 'asdf';

set foreign_KEY_CHECKS = 0;
update Buchung b set b.BewertungID = @neueBewertungsID  where b.Id = bId;
set foreign_KEY_CHECKS = 1;

end//

delimiter ;

