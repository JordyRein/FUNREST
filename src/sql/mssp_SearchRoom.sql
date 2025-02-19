
drop procedure if exists mssp_SearchRoom;

delimiter //

create procedure mssp_SearchRoom(
   in cat int,
   in typ int
)
begin

select k.Name, t.Name, z.Bild, k.Preis*t.PreisScale from Zimmer z
join Kategorie k on z.KategorieId=k.Id
join Typ t on t.Id=z.Typ
where z.KategorieId=cat and z.Typ=typ or
      z.KategorieId=cat and typ=-1 or
      z.Typ=typ and cat=-1;

end//

delimiter ;
