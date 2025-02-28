
drop procedure if exists mssp_SearchRoomFiltered;

delimiter //

-- gibt alle verfügbaren Zimmer aus
-- wenn der Buchungszeitraum NULL ist, sollen alle Zimmer ausgegeben werden

create procedure mssp_SearchRoomFiltered(
   in dateStart nvarchar(25),
   in dateEnd nvarchar(25), 
   in cat int,      
   in typ int    
)
begin

select z.Id as 'Id',
       z.Name as 'Name',
       k.Name as 'Kategorie', 
       t.Name as 'Typ', 
       z.Bild as 'Bild', 
       k.Preis*t.PreisScale as 'Preis'
       from Zimmer z
join Kategorie k        on z.KategorieId=k.Id
join Typ t              on t.Id=z.Typ
left join Buchung b     on b.ZimmerID=z.Id
                        and (b.Anreise < dateEnd and b.Abreise > dateStart)
where (z.KategorieId=cat      and z.Typ=typ    or
      z.KategorieId=cat       and typ=-1       or
      z.Typ=typ               and cat=-1       or
      typ=-1                  and cat=-1)      and 
      b.Id is null;

end//

delimiter ;


