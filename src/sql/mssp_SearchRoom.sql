
drop procedure if exists mssp_SearchRoom;

delimiter //

create procedure mssp_SearchRoom(
   in search nvarchar(255)
)
begin

select z.Name as 'Name',
       k.Name as 'Kategorie', 
       t.Name as 'Typ', 
       z.Bild as 'Bild', 
       k.Preis*t.PreisScale as 'Preis'
       from Zimmer z
join Kategorie k on z.KategorieId=k.Id
join Typ t on t.Id=z.Typ
where (k.Name like concat('%', search, '%') or
      t.Name like concat('%', search, '%')) or
      (z.Id = convert(search, unsigned) and 
      convert(search, unsigned)<>0);

end//

delimiter ;
