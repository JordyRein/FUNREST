
drop procedure if exists mssp_SetReviewOK;

delimiter //

create procedure mssp_SetReviewOK(
  in val int,
  in id int,
  in mid int
)
begin

update Bewertung b
set Geprueft=val,
    MitarbeiterID=mid
where b.id=id;

end//

delimiter ;
