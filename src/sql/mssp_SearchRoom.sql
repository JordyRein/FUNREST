
drop procedure if exists mssp_SearchRoom;

delimiter //

create procedure mssp_SearchRoom(
   in cat int,
   in typ int
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
where z.KategorieId=cat and z.Typ=typ or
      z.KategorieId=cat and typ=-1 or
      z.Typ=typ and cat=-1 or
      typ=-1 and cat=-1;

end//

delimiter ;
