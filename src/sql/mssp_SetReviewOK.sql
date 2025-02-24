
drop procedure if exists mssp_SetReviewOK;

delimiter //

create procedure mssp_SetReviewOK(
  in id int,
  in mid int
)
begin

update Bewertung b
set Geprueft=1,
    MitarbeiterID=mid
where b.id=id;

end//

delimiter ;
