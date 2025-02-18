
drop procedure if exists mssp_SearchKunde;

delimiter //

create procedure mssp_SearchKunde(
   in search nvarchar(255)
)
begin
  select * from Kunde 
  where Vorname  like '%search%' or 
        Nachname like '%search%';

end//

delimiter ;
