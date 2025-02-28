
drop procedure if exists mssp_AddReservationKunde;

delimiter //

create procedure mssp_AddReservationKunde(
   in kId int,
   in zId int,
   in bZeitraum int,
   in kost decimal(10,0),
   in starte date,
   in ende date
)
begin

insert into Buchung (KundenID, ZimmerID, BuchungZeitRaum, Kosten, Anreise, Abreise, MitarbeiterID,	BewertungID) values (
   kId,
   zId,
   bZeitraum,
   kost,
   starte,
   ende,
   NULL,
   NULL
);

end//

delimiter ;
