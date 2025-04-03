
drop procedure if exists mssp_CheckAdminLogin;

delimiter //

create procedure mssp_CheckAdminLogin(
   in usr nvarchar(50),
   in pw  nvarchar(255)
)
begin

select  m.Id, 
        m.Vorname, 
        m.Nachname,
        m.Rolle
        from LoginDaten l
join Mitarbeiter m on m.LoginId=l.Id
where l.Nutzername = usr and
      l.Passwort = pw;

end//

delimiter ;
