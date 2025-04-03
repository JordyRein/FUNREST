// --------------------------------------------------------------------
// Anlegen von verschiedenen immer wieder genutzten Variablen
// --------------------------------------------------------------------

// Abspeichern des angemeldeten Nutzers
let LoggedInUser
// Hilfsvariable um startfunktionen nur einmal auszuführen
let firstLoad = false
// Variablen für zwischenspeicherung der aus der Datenbank geladenen Daten
let ZimmerArray
let ArrayBuchungen
let ArrayBewertungen

// --------------------------------------------------------------------
// Ausführen von Funktionen die nach dem fertigen Laden der Website ausgeführt werden müssen anch dem ersten Starten
// --------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    if(firstLoad === false){
        createZimmerFilterMenü()
        updateZimmerArray()
        firstLoad = true
    }
});

// --------------------------------------------------------------------
// Block aller verwendeten Funktionen
// --------------------------------------------------------------------

// Schließen des Login-Popups und zurücksetzten der Website
function closeLogin() {
    const body = document.getElementsByTagName('body');
    const loginForm = document.getElementById('popup');
    body[0].removeChild(loginForm)

    if(LoggedInUser != undefined){
        userProfileMin()
    }
}

// Erzeugen des Feldes im Header mit dem Nutzernamen, dem Einstellungs-Link und der Auslogbutton
function userProfileMin(){
    const buttonsHeader = document.getElementById('buttonsHeader')
    emptyContainer(buttonsHeader)

    const minProfileDiv = document.createElement('div')
    minProfileDiv.style.display = 'block'
    minProfileDiv.style.border = '2px solid darkgray'
    minProfileDiv.style.borderRadius = '5px'
    minProfileDiv.style.backgroundColor = 'lightsalmon'
    minProfileDiv.style.margin = '5px'
    minProfileDiv.style.height = '90%'
    minProfileDiv.style.width = '90%'
    minProfileDiv.style.alignItems = 'center'
    minProfileDiv.style.justifyItems = 'center'

    const name = document.createElement('h3')
    console.log('firstname?', LoggedInUser.FirstName)
    name.innerText = LoggedInUser.FirstName
    name.style.padding = '0px'
    name.style.justifySelf = 'center'
    name.style.margin = '10px 0px 5px 0px'

    const profile = document.createElement('button')
    profile.id = 'headerButton'
    profile.innerText = 'Einstellungen'
    profile.style.minHeight = '40px'
    profile.style.width = '90%'
    profile.style.margin = '0px'
    profile.style.marginBottom = '5px'
    profile.setAttribute('onclick', 'openProfile()');

    const logoutButton = document.createElement('button')
    logoutButton.id = 'headerButton'
    logoutButton.innerText = 'Ausloggen'
    logoutButton.style.minHeight = '40px'
    logoutButton.style.width = '90%'
    logoutButton.style.margin = '0px'
    logoutButton.style.marginBottom = '5px'
    logoutButton.setAttribute('onclick', 'logoutUser()');

    minProfileDiv.appendChild(name)
    minProfileDiv.appendChild(profile)
    minProfileDiv.appendChild(logoutButton)

    buttonsHeader.appendChild(minProfileDiv)
}

// Ausloggen des Nutzers:
// - ablöschen des gespeicherten eingeloggten Nutzers
// - wiederherstellen des Headers
// - zurücksetzten der Website auf "Start"
function logoutUser(){
    LoggedInUser = undefined
    const buttonsHeader = document.getElementById('buttonsHeader')
    emptyContainer(buttonsHeader)
    const headerButtons = document.createElement('button')
    headerButtons.id = 'headerButton'
    headerButtons.type = 'button'
    headerButtons.textContent = 'Login'
    headerButtons.style.alignSelf = 'center'
    headerButtons.style.justifySelf = 'center'
    headerButtons.onclick = ()=>loginUser()
    buttonsHeader.appendChild(headerButtons)
    buttonsHeader.style.display = 'flex'
    const content = document.getElementById('contentSpace')
    emptyContainer(content)
    createZimmerFilterMenü()
    updateZimmerArray()
}

// Bei Klick auf den Einstellungs-Link
// - leeren des Anzeigefensters
// - erstellen des Filtermenüs für das Profil auf der linken Seite
// - laden der Daten aus der Datenbank für Buchungen und Bewertungen des Nutzers
function openProfile(){
    const container = document.getElementById('contentSpace')
    emptyContainer(container)
    createProfileFitlerMenü()
    loadData()
}

// Bei Klick auf den Login-Button
// - erstellen des Popups für den Login
function loginUser(){
    const header = document.getElementsByTagName('header')

    const loginContainerDiv = document.createElement('div')
    loginContainerDiv.id = 'popup'
    loginContainerDiv.className = 'popup'

    const loginContentDiv = document.createElement('div')
    loginContentDiv.className = 'popup-content'

    const form = document.createElement('form')
    form.id = 'LoginForm'

    const loginDiv = document.createElement('div')
    loginDiv.id = 'divLogin'

    const cancelButton = document.createElement('button')
    cancelButton.id = 'cancel'
    cancelButton.className = 'cancel'
    cancelButton.type = 'button'
    cancelButton.textContent = 'X'
    cancelButton.onclick = ()=>closeLogin()
    loginDiv.appendChild(cancelButton)

    const loginH = document.createElement('h3')
    loginH.textContent = 'Login:'
    loginDiv.appendChild(loginH)

    const userLabel = document.createElement('label')
    userLabel.setAttribute('for', 'username')
    userLabel.textContent = 'Benutzername: '

    const userInput = document.createElement('input')
    userInput.type = 'text'
    userInput.id = 'username'
    userInput.name = 'username'
    userInput.required = true

    const passwordLabel = document.createElement('label')
    passwordLabel.setAttribute('for', 'password')
    passwordLabel.textContent = 'Passwort: '

    const passwordInput = document.createElement('input')
    passwordInput.type = 'password'
    passwordInput.id = 'password'
    passwordInput.name = 'password'
    passwordInput.required = true

    const button = document.createElement('button')
    button.type = 'submit'
    button.textContent = 'Login'
    button.onclick = ()=>login()

    const createLabel = document.createElement('label')
    createLabel.textContent = 'noch kein Kunde?'

    const registrierButton = document.createElement('button')
    registrierButton.type = 'button'
    registrierButton.textContent = 'Jetzt registrieren!'
    registrierButton.onclick = ()=> createRegistrierPopup()

    loginDiv.appendChild(userLabel)
    loginDiv.appendChild(userInput)
    loginDiv.appendChild(passwordLabel)
    loginDiv.appendChild(passwordInput)
    loginDiv.appendChild(button)
    loginDiv.appendChild(createLabel)
    loginDiv.appendChild(registrierButton)

    form.appendChild(loginDiv)

    loginContentDiv.appendChild(form)

    loginContainerDiv.appendChild(loginContentDiv)

    header[0].insertAdjacentElement("afterend",loginContainerDiv)
}

// Bei Klick auf den Registrier-Button im Login-Popup
// - ablöschen des Login-Popups
// - erzeugen des Registrier-Popups anstelle des Login-Popups
function createRegistrierPopup(){
    const header = document.getElementsByTagName('header')

    const body = document.getElementsByTagName('body');
    const loginForm = document.getElementById('popup');
    body[0].removeChild(loginForm)

    const registerContainerDiv = document.createElement('div')
    registerContainerDiv.id = 'popup'
    registerContainerDiv.className = 'popup'
    registerContainerDiv.style.height = '750px'

    const registerContentDiv = document.createElement('div')
    registerContentDiv.className = 'popup-content'

    // Formular
    const form = document.createElement('form');
    form.id = 'profileForm';

    const cancelButton = document.createElement('button')
    cancelButton.className = 'cancel'
    cancelButton.type = 'button'
    cancelButton.textContent = 'X'
    cancelButton.onclick = ()=>closeLogin()
    form.appendChild(cancelButton)

    const registrierH = document.createElement('h3')
    registrierH.textContent = 'Registrieren:'
    form.appendChild(registrierH)

    const fields = [
        { label: 'Nutzername', id: 'username', type:'text', required: true},
        { label: 'Passwort', id: 'password', type: 'password', required: true},
        { label: 'Vorname:', id: 'firstName', type: 'text', required: true },
        { label: 'Nachname:', id: 'lastName', type: 'text', required: true},
        { label: 'Straße & Hausnummer:', id: 'street', type: 'text', required: false },
        { label: 'PLZ:', id: 'zipCode', type: 'text', pattern: '[0-9]*', required: false},
        { label: 'Stadt:', id: 'city', type: 'text', required: false}
    ];

    fields.forEach(field => {
        const div = document.createElement('div')
        div.style.display = 'flex'
        div.style.flexDirection = 'row'

        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.textContent = field.label;
        label.style.width = '160px'
        div.appendChild(label);

        const input = document.createElement('input');
        input.style.width = '95%'
        input.type = field.type;
        input.id = field.id;
        input.name = field.id;
        input.required = field.required
        if (field.pattern) input.pattern = field.pattern;
        div.appendChild(input);
        form.appendChild(div);
    });

    // Geschlecht
    const genderLabel = document.createElement('label');
    genderLabel.setAttribute('for', 'gender');
    genderLabel.textContent = 'Geschlecht:';
    form.appendChild(genderLabel);

    const genderSelect = document.createElement('select');
    genderSelect.id = 'gender';
    genderSelect.name = 'gender';
    genderSelect.required = true;
   
    const optionElementM = document.createElement('option');
    optionElementM.value = 'M';
    optionElementM.textContent = 'männlich';
    genderSelect.appendChild(optionElementM);
    const optionElementW = document.createElement('option');
    optionElementW.value = 'W';
    optionElementW.textContent = 'weiblich';
    genderSelect.appendChild(optionElementW);
    const optionElementD = document.createElement('option');
    optionElementD.value = 'D';
    optionElementD.textContent = 'divers';
    genderSelect.appendChild(optionElementD);

    form.appendChild(genderSelect);

    // Geburtsdatum
    const birthDateLabel = document.createElement('label');
    birthDateLabel.setAttribute('for', 'birthDate');
    birthDateLabel.textContent = 'Geburtsdatum:';
    form.appendChild(birthDateLabel);

    const birthDateInput = document.createElement('input');
    birthDateInput.type = 'date';
    birthDateInput.id = 'birthDate';
    birthDateInput.name = 'birthDate';
    birthDateInput.required = true;
    form.appendChild(birthDateInput);

    // Submit Button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Profil Anlegen';
    form.appendChild(submitButton);
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = this[1].value
        const password = this[2].value
        const vorname = this[3].value
        const nachname = this[4].value
        const strHausnummer = this[5].value
        const plz = this[6].value
        const stadt = this[7].value
        const geschlecht = this[8].value
        const gebdatum = this[9].value

        //Hier die Speicherfunktion zur Datenbank
        const profile = {
            FirstName: vorname, 
            LastName: nachname, 
            Address: strHausnummer, 
            PLZ: plz, 
            City: stadt,
            Sex: geschlecht,
            Birthdate: gebdatum,
            usr: username,
            pw: password
        }
        console.log('anzulegendes Profil', profile)

        RequestPHP('POST', 'KundePost.php?req=ProfilAnlegen', (data)=>{
            console.log('res Nutzer angelegt:', JSON.parse(data))
            if (JSON.parse(data)=="ok"){
                alert('Profil erfolgreich angelegt! Bitte loggen Sie sich ein');
            }
        }, (error)=>{
            console.log('rückgabe mit error',error)
        }, JSON.stringify(profile))

        const body = document.getElementsByTagName('body');
        const loginForm = document.getElementById('popup');
        body[0].removeChild(loginForm)
    });

    registerContentDiv.appendChild(form)

    registerContainerDiv.appendChild(registerContentDiv)

    header[0].insertAdjacentElement("afterend",registerContainerDiv)
}

// Bei Klick auf Login im Login-Popup
// - erstellen des Eventlistenes
// - Abfrage an die Datenbank:
//   OK:  - abspeichern des aus der Datenbank auf die Abfrage zurückgegebenen Nutzers
//        - Aufruf der Funktion "closeLogin()"
//   Err: - Rückgabe Fehlermeldung 
function login(){
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('LoginForm').addEventListener (
        "submit", 
        function (evt) {
            var fd = new FormData(document.getElementById('LoginForm'));
            RequestPHP("POST", "KundeLogin.php",
                (data)=>{
                    if(data==JSON.stringify("login_err_idpass")){
                      alert("Id/Pass False");
                      return;
                    }
                    LoggedInUser=JSON.parse(data);

                    console.log('loggedInUser', LoggedInUser)
                    closeLogin()
                },
                ()=>{
                },
                fd);

            evt.preventDefault();
            }
    )
}

// Datenbankabfrage: Abspeichern aller Zimmer auf der globalen Variable "ZimmerArray"
async function getAllZimmer(){
    const url = "AdminSearch.php?req=Zimmer&search="+encodeURIComponent('');
    await RequestPHPAsync(url, (data)=>{
        const zimmer = JSON.parse(data)
        ZimmerArray = zimmer
    }, ()=>{})
}

// Datenbankabfrage: Abspeichern aller Buchungen auf "ArrayBuchungen" und aller Bewertungen auf "ArrayBewertungen" des eingeloggten Nutzers
async function loadData(){
    const urlBuch = "KundeSearch.php?req=Buchung&kunde="+encodeURIComponent(LoggedInUser.Id);
    console.log('urlBuchung', urlBuch)
    await RequestPHPAsync(urlBuch, (data)=>{
        const buchung = JSON.parse(data)
        ArrayBuchungen = buchung
    }, ()=>{})

    const urlBewe = "KundeSearch.php?req=Bewertung&kunde="+encodeURIComponent(LoggedInUser.Id);
    await RequestPHPAsync(urlBewe, (data)=>{
        const bewertung = JSON.parse(data)
        ArrayBewertungen = bewertung
    }, ()=>{})
    return true
}

// Erstellen der Zimmerliste aufgrund der globalen Variable "ZimmerArray"
function createZimmerListe() {
    // Ablöschen des Bereichs der Zimmerliste, als Sicherheit, dass nichts doppelt vorkommt
    const content = document.getElementById('contentSpace')
    emptyContainer(content)

    // erstellen der "Liste", dem übergeodrneten DIV dem dann die "Kacheln" der einzelnen Zimmer untergeordnet werden
    const zimmerListe = document.createElement('div')
    zimmerListe.id = 'zimmerListe'

    // wir iterieren über unser Zimmerarray, was in "updateZimmerArray" neu beschrieben hatten. Für jedes Element wird:
    ZimmerArray.forEach(zimmer =>{
        // - die Element erstellt in das alle Zimmerinhalte eingefügt werden
        const zimmerDiv = document.createElement('div');
        zimmerDiv.className = 'zimmerGrid';
    
        // - ein Element erzeugt in das die Informationen eingefügt werden
        const zimmerInfoGrid = document.createElement('div');
        zimmerInfoGrid.className = 'zimmerInfoGrid';
    
        // - ein Element erzeugt in das die Überschrift eingefügt wird
        const zimmerHeader = document.createElement('div');
        zimmerHeader.className = 'zimmerHeader';
    
        // - erzeugen der Überschrift Teil 1 mit den Hauptangaben zu dem Zimmer
        const zimmerÜberschrift1 = document.createElement('h3');
        zimmerÜberschrift1.className = 'zimmerÜberschrift';
        zimmerÜberschrift1.innerText = zimmer.Kategorie + ' ' + zimmer.Typ + ':';
    
        // - erzeugen der Überschrift Teil 2 mit dem Namen des Zimmers
        const zimmerÜberschrift2 = document.createElement('h3');
        zimmerÜberschrift2.className = 'zimmerÜberschrift';
        zimmerÜberschrift2.innerText = zimmer.Name
    
        // Einfügen in das Element für die Überschrift. Zuerst Teil 1, dann 2, sodass es richtig dargestellt wird
        zimmerHeader.appendChild(zimmerÜberschrift1);
        zimmerHeader.appendChild(zimmerÜberschrift2);
    
        // ein Element erstellen in das die detail-Informationen eingefügt werden
        const detailedInfoGrid = document.createElement('div');
        detailedInfoGrid.className = 'detailedInfoGrid';
    
        // HilfsVariable: umwandeln und abspeichern des Zimmerpreises in das gewünschte Format mit 2 Nachkommastellen
        const preis = parseFloat(zimmer.Preis).toFixed(2)

        // Erstellen des Buttons zum Buchen des Zimmers, bei dessen Klick die "zimmerReservieren"-Funktion angewendet wird.
        // Übergeben werden dann die ID des Zimmers und der Preis
        const buchenButton = document.createElement('button');
        buchenButton.id = zimmer.Name ;
        buchenButton.className = 'buttonBuchung';
        buchenButton.innerText = 'Zimmer jetzt buchen!!';
        buchenButton.onclick = ()=>zimmerReservieren(zimmer.Id, preis)

        //HilfsVariable: abspeichern des Rabattierten Wochenpreises
        let preisWoche = preis * 6
        preisWoche = parseFloat(preisWoche).toFixed(2)

        // Erstellen der Detail-Tabelle die die Preise beinhaltet
        const preisTable = document.createElement('table');
        preisTable.className = 'zimmerTable'
        // unterelemente zum Platzsparen und da sich am Aufbau ncihts ändert gehardcoded in die Inner-HTML der Tabelle geschrieben
        preisTable.innerHTML = `
            <tr><th>Preis:</th></tr>
            <tr><td>`+ preis +`€/Nacht</td></tr>
            <tr><td>`+ preisWoche +`€/Woche</td></tr>
        `;
    
        // Anlegen von Hiflsvariablen für Ausstattungsmerkmale.
        // Anmerkung: Idealerweise in eigene Tabelle in der Datenbank auslagern und von dort abfragen, und hier dann mit Ausstattungs-
        // merkmal 1-9 betiteln.
        // -> hier einfach die Ausstattungsmerkmale der Zimmer nach Kategorie gehardcoded zugewiesen
        let Fernseher = ''
        let Küche = ''
        let Wohnzimmer = ''
        let Außenbereich = ''
        let Bad = ''
        let Extra = ''
        switch (zimmer.Kategorie) {
            case "Standard":
                Fernseher = '20-Zoll Fernseher'
                Küche = 'Toaster'
                Wohnzimmer = 'Schlafcouch'
                Außenbereich = 'Balkon'
                Bad = 'Duschwanne'
                Extra = ' '
                break;
            case "Premium":
                Fernseher = '32-Zoll Fernseher'
                Küche = 'Kochecke'
                Wohnzimmer = 'Wohnlandschaft'
                Außenbereich = 'Balkon'
                Bad = 'Badewanne'
                Extra = 'Zimmerservice'
                break;
            case "Luxus":
                Fernseher = 'Heimkino'
                Küche = 'Küche'
                Wohnzimmer = 'Ledercouch'
                Außenbereich = 'Gartenzugang'
                Bad = 'Whirlpool'
                Extra = 'Butler'
                break;
            default:
                Fernseher = 'default'
                Küche = 'default'
                Wohnzimmer = 'default'
                Außenbereich = 'default'
                Bad = 'default'
                Extra = ' '
        }
    
        // erstellen der Detail-Tabelle die die Ausstattungsmerkmale beinhaltet
        // (auch wieder nach oben erklärtem Prinzip zum sparen)
        const ausstattungTable = document.createElement('table');
            ausstattungTable.className = 'zimmerTable'
        if(Extra === ' '){
            ausstattungTable.innerHTML = `
                <tr><th>Ausstattung</th></tr>
                <tr><td>`+ Fernseher +`</td><td>`+ Küche +`</td><td>`+ Wohnzimmer +`</td></tr>
                <tr><td>`+ Außenbereich+`</td><td>`+ Bad +`</td></tr>`;
        }else{
            ausstattungTable.innerHTML = `
                <tr><th>Ausstattung</th></tr>
                <tr><td>`+ Fernseher +`</td><td>`+ Küche +`</td><td>`+ Wohnzimmer +`</td></tr>
                <tr><td>`+ Außenbereich+`</td><td>`+ Bad +`</td><td>`+ Extra +`</td></tr>`;
        }
        
        // Erstellen von einfachen Platzhaltern, dass die Formatierung so angezeigt wird wie erwünscht
        // (in nächster überarbeitung den Aufbau des "ZimmerInfoGrids" überarbeiten um die platzhalter überflüssig zu machen)
        const platzhalterTable1 = document.createElement('table')
        platzhalterTable1.className = 'platzhalter'
        platzhalterTable1.innerHTML = `
            <tr><th> </th></tr>
        `;
        const platzhalterTable2 = document.createElement('table')
        platzhalterTable2.className = 'platzhalter'
        platzhalterTable2.innerHTML = `
            <tr><th> </th></tr>
        `;
        const platzhalterTable3 = document.createElement('table')
        platzhalterTable3.className = 'platzhalter'
        platzhalterTable3.innerHTML = `
            <tr><th> </th></tr>
        `;

        // - ein Element erzeugt in das das Bild eingefügt werden kann
        const zimmerBild = document.createElement('div');
        zimmerBild.className = 'zimmerBild';
    
        // erstellen des Bildelements. Hier ersteinmal ein Platzhalterbild
        // (in nächster Überarbeitung die src durch einen in der Datenbank bei dem Zimmer hinterlegten link ersetzten und 
        //  Bidler zu diesen Links in dem Projektodner hinterlegen)
        const img = document.createElement('img');
        img.className = 'genericZimmerBilder';
        img.src = 'zimmerbild.png'
        img.alt = 'Hotelzimmer';
        img.style.height = '142px';

        // das Bildelemnt wird in das zuvor erzeuge Element eingefügt
        zimmerBild.appendChild(img);

        // in der Richtigen Reihenfolge werden jetzt in das Detail-Info-Grid von links nach rechts zuerst der Reservierbutton, dann
        // die Tabelle mit den Preisen und anschließend die Tabelle mit der Ausstattung eingefügt. Je getrennt durch einen Platzhalter
        detailedInfoGrid.appendChild(buchenButton);
        detailedInfoGrid.appendChild(platzhalterTable1)
        detailedInfoGrid.appendChild(preisTable);
        detailedInfoGrid.appendChild(platzhalterTable2)
        detailedInfoGrid.appendChild(ausstattungTable);
        detailedInfoGrid.appendChild(platzhalterTable3)
    
        // dem Infogrid werden jetzt die Informationen hinzugefügt von oben nach unten. Zuerst das die Überschriften enthaltetnde Element, 
        // dann unser gerade gefülltes Detail-Grid
        zimmerInfoGrid.appendChild(zimmerHeader);
        zimmerInfoGrid.appendChild(detailedInfoGrid);
    
        // in die Zimmerkachel werden jetzt von Links nach Rechts zuerst als Info-Grid, mit allen schriftlichen Informationen und 
        // anschließend das das Bild enthaltende Element hinzugefügt
        zimmerDiv.appendChild(zimmerInfoGrid);
        zimmerDiv.appendChild(zimmerBild);

        // Die fertige Zimmerkachel wird der Zimmerliste hinzugefügt
        zimmerListe.appendChild(zimmerDiv);

    })

    // wenn die gesamte Zimmerliste erstellt ist wird die sbchließend unserem zu beginn geleertem Content-Element hinzugefügt
    content.appendChild(zimmerListe)
}

// Zimmerreservierung:
// - überprüfen ob ein User angemeldet ist (ERR: Alert: bitte anmelden)
// - überprüfen ob ein Datum ausgewählt wurde (ERR: Alert: Reisedatum angeben)
// - abspeichern der Reservierung in der Datenbank
async function zimmerReservieren(zimmerid, zimmerpreis){
    if(LoggedInUser != undefined){
        const dateStart = document.getElementById('dateStart')
        const dateEnd = document.getElementById('dateEnd')

        const start = new Date(dateStart.value);
        const end = new Date(dateEnd.value);
        if(isNaN(start.getTime()) || isNaN(end.getTime()) || start > end){
            alert('bitte reisedatum überdrüfen')
        }else{
            const differenzInMs = end - start;
            const differenzInTagen = differenzInMs / (1000 * 60 * 60 * 24);
            const anzahlNaechte = differenzInTagen;

            let preis = zimmerpreis * anzahlNaechte
            if(anzahlNaechte > 7){
                preis = preis-zimmerpreis
            }
            
            const reservation = {
                BuchungId: -1,
                KundenId: LoggedInUser.Id,
                ZimmerId: zimmerid,
                Anreise: dateStart.value,
                Abreise: dateEnd.value,
                BuchungsZeitraum: anzahlNaechte,
                Kosten: preis
            } 
            console.log('Reservation', reservation)

            RequestPHP('POST', 'KundePost.php?req=BuchungHinzufügen', (data)=>{
                if (JSON.parse(data)=="ok"){
                    alert('Aufenthalt gebucht')
                }
            }, (error)=>{
                console.log('rückgabe mit error',error)
            }, JSON.stringify(reservation))
        }
        
    }else{
        alert('bitte zuerst einloggen')
    }
}

// Aktualisieren der Nutzerdaten im Profil
// - erstellen einer "Form" mit den aktuellen Daten des Nutzers
// - aktualisierung des User-Profils in der Datenbank
function createProfileForm() {

    const container = document.getElementById('contentSpace')
    emptyContainer(container)

    const profilContainer = document.createElement('div');
    profilContainer.id = 'profilContainer';
    profilContainer.width = '95%'

    const h3 = document.createElement('h3');
    h3.textContent = 'Profil anpassen:';
    profilContainer.appendChild(h3);

    // Formular
    const form = document.createElement('form');
    form.id = 'profileForm';

    const fields = [
        { label: 'Vorname:', id: 'firstName', type: 'text', value: LoggedInUser.FirstName },
        { label: 'Nachname:', id: 'lastName', type: 'text', value: LoggedInUser.LastName },
        { label: 'Straße & Hausnummer:', id: 'street', type: 'text', value: LoggedInUser.Address },
        { label: 'PLZ:', id: 'zipCode', type: 'text', pattern: '[0-9]*', value: LoggedInUser.PLZ },
        { label: 'Stadt:', id: 'city', type: 'text', value: LoggedInUser.Location }
    ];

    fields.forEach(field => {
        const div = document.createElement('div')
        div.style.display = 'flex'
        div.style.flexDirection = 'row'

        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.textContent = field.label;
        label.style.width = '160px'
        div.appendChild(label);

        const input = document.createElement('input');
        input.style.width = '95%'
        input.type = field.type;
        input.id = field.id;
        input.name = field.id;
        input.value = field.value;
        input.required = true;
        if (field.pattern) input.pattern = field.pattern;
        div.appendChild(input);
        form.appendChild(div);
    });

    // Geschlecht
    const genderLabel = document.createElement('label');
    genderLabel.setAttribute('for', 'gender');
    genderLabel.textContent = 'Geschlecht:';
    form.appendChild(genderLabel);

    const genderSelect = document.createElement('select');
    genderSelect.id = 'gender';
    genderSelect.name = 'gender';
    genderSelect.required = true;
   
    const optionElementM = document.createElement('option');
    optionElementM.value = 'M';
    optionElementM.textContent = 'männlich';
    genderSelect.appendChild(optionElementM);
    const optionElementW = document.createElement('option');
    optionElementW.value = 'W';
    optionElementW.textContent = 'weiblich';
    genderSelect.appendChild(optionElementW);
    const optionElementD = document.createElement('option');
    optionElementD.value = 'D';
    optionElementD.textContent = 'divers';
    genderSelect.appendChild(optionElementD);
   
    switch (LoggedInUser.Sex) {
        case "M":
            optionElementM.defaultSelected = true
            break;
        case "W":
            optionElementW.defaultSelected = true
            break;
        case "D":
            optionElementD.defaultSelected = true
            break;
        default:
            //defaultcase einfügen
    }

    form.appendChild(genderSelect);

    // Geburtsdatum
    const birthDateLabel = document.createElement('label');
    birthDateLabel.setAttribute('for', 'birthDate');
    birthDateLabel.textContent = 'Geburtsdatum:';
    form.appendChild(birthDateLabel);

    const birthDateInput = document.createElement('input');
    birthDateInput.type = 'date';
    birthDateInput.id = 'birthDate';
    birthDateInput.name = 'birthDate';
    birthDateInput.value = LoggedInUser.Birthday;
    birthDateInput.required = true;
    form.appendChild(birthDateInput);

    // Submit Button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Speichern';
    form.appendChild(submitButton);
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const vorname = this[0].value
        const nachname = this[1].value
        const strHausnummer = this[2].value
        const plz = this[3].value
        const stadt = this[4].value
        const geschlecht = this[5].value
        const gebdatum = this[6].value

        //Hier die Speicherfunktion zur Datenbank
        const profile = {
            Id: LoggedInUser.Id,
            FirstName: vorname, 
            LastName: nachname, 
            Address: strHausnummer, 
            PLZ: plz, 
            City: stadt,
            Sex: geschlecht,
            Birthdate: gebdatum
        }
        console.log('anzulegendes Profil', profile)
        RequestPHP('POST', 'KundePost.php?req=ProfileUpdaten', (data)=>{
            if (JSON.parse(data)=="ok"){
                alert('Profil erfolgreich aktualisiert!');
            }
        }, (error)=>{
            console.log('rückgabe mit error',error)
        }, JSON.stringify(profile))

        
    });

    profilContainer.appendChild(form);

    container.appendChild(profilContainer)
}

// Bei Klick auf "Bewertungen zu Buchungen abgeben" im User Profil
// - erstellen des Grundaufbaus mit drei Abschnitten auf den Daten von "BuchungenArray" und "BewertungenArray"
//   - Buchungen zu denen Bewertugnen angelegt werden können mit der dementstechenden Form
//   - Buchungen in der Zukunft zu dnen noch keine Angelegt werden können
//   - bereits abgegebene Bewertungen
// - erstellen von Fehelrmeldugnen wenn in dem jeweiligen Abschnitt keine Daten da sind
function createBewertungForm(){
    const container = document.getElementById('contentSpace')
    emptyContainer(container)

    const abzugebendeBewertungenDiv = document.createElement('div')
    abzugebendeBewertungenDiv.className = 'profileBuchungsContainer'
    abzugebendeBewertungenDiv.style.width = '95%'

    const abzugebendeBewertungenH = document.createElement('h3')
    abzugebendeBewertungenH.className = 'ueberschriftBuchungsContainer'
    abzugebendeBewertungenH.textContent = 'Bewertungen zu ihren Aufenthalten anlegen: '
    abzugebendeBewertungenH.style.marginBottom = '0px'

    abzugebendeBewertungenDiv.appendChild(abzugebendeBewertungenH)

    container.appendChild(abzugebendeBewertungenDiv)

    const nichtAbgeschlossenDiv = document.createElement('div')
    nichtAbgeschlossenDiv.className = 'profileBuchungsContainer'
    nichtAbgeschlossenDiv.style.width = '95%'

    const nichtAbgeschlossenH = document.createElement('h3')
    nichtAbgeschlossenH.className = 'ueberschriftBuchungsContainer'
    nichtAbgeschlossenH.textContent = 'Bewertung zu diesem Aufenthalt kann noch nicht angelegt werden: '
    nichtAbgeschlossenH.style.marginBottom = '0px'
    
    nichtAbgeschlossenDiv.appendChild(nichtAbgeschlossenH)

    container.appendChild(nichtAbgeschlossenDiv)

    let counter1 = 0
    let counter2 = 0
    if(ArrayBuchungen){
        ArrayBuchungen.forEach(buchung => {
            
            if(buchung.BewertungsId === null && new Date(buchung.Abreise) < new Date()){
                counter1 = counter1 + 1
                //aufenthalt abgeschlossen und bewertung fehlt
                const bewertungsDiv = document.createElement('div')
                bewertungsDiv.className = 'bewertungContainer'
                bewertungsDiv.style.padding = '10px'
        
                const ersteReihe = document.createElement('div');
                ersteReihe.className = 'ersteReihe';
        
                const buchungsInfoSpan = document.createElement('h4');
                buchungsInfoSpan.textContent = 'BuchungsNummer: ' + buchung.BuchungId + '    Aufenthaltszeitraum: '+ buchung.Anreise + ' - ' + buchung.Abreise + '   Zimmer: ' + buchung.ZimmerName
                buchungsInfoSpan.className = 'buchungsInfo';
                
                ersteReihe.appendChild(buchungsInfoSpan);
        
                const zweiteReihe = document.createElement('div');
                zweiteReihe.className = 'zweiteReihe';
        
                const form = document.createElement('form');
                form.id = 'buchungsForm';
        
                const sterneLabel = document.createElement('label');
                sterneLabel.setAttribute('for', 'sterne');
                sterneLabel.textContent = 'Sternvergabe:';
                form.appendChild(sterneLabel);
            
                const sterneSelect = document.createElement('select');
                sterneSelect.id = 'sterne';
                sterneSelect.name = 'sterne';
                sterneSelect.required = true;
               
                const Stern0Element = document.createElement('option');
                Stern0Element.value = '0';
                Stern0Element.textContent = '☆ ☆ ☆ ☆ ☆';
                sterneSelect.appendChild(Stern0Element);
                const Stern1Element = document.createElement('option');
                Stern1Element.value = '1';
                Stern1Element.textContent = '★ ☆ ☆ ☆ ☆';
                sterneSelect.appendChild(Stern1Element);
                const Stern2Element = document.createElement('option');
                Stern2Element.value = '2';
                Stern2Element.textContent = '★ ★ ☆ ☆ ☆';
                sterneSelect.appendChild(Stern2Element);
                const Stern3Element = document.createElement('option');
                Stern3Element.value = '3';
                Stern3Element.textContent = '★ ★ ★ ☆ ☆';
                sterneSelect.appendChild(Stern3Element);
                const Stern4Element = document.createElement('option');
                Stern4Element.value = '4';
                Stern4Element.textContent = '★ ★ ★ ★ ☆';
                sterneSelect.appendChild(Stern4Element);
                const Stern5Element = document.createElement('option');
                Stern5Element.value = '5';
                Stern5Element.textContent = '★ ★ ★ ★ ★';
                sterneSelect.appendChild(Stern5Element);
            
                form.appendChild(sterneSelect);
        
                const titleDiv = document.createElement('div')
                titleDiv.style.display = 'flex'
                titleDiv.style.flexDirection = 'row'
        
                const titelLabel = document.createElement('label');
                titelLabel.textContent = 'Titel:'
                titelLabel.style.width = '100px'
                titleDiv.appendChild(titelLabel);
        
                const titleInput = document.createElement('input');
                titleInput.style.width = '95%'
                titleInput.type = 'text';
                titleInput.name = buchung.BuchungId + '-title';
                titleInput.required = true;
        
                titleDiv.appendChild(titleInput);
                form.appendChild(titleDiv);
        
                const textDiv = document.createElement('div')
                textDiv.style.display = 'flex'
                textDiv.style.flexDirection = 'row'
        
                const textLabel = document.createElement('label');
                textLabel.textContent = 'Bewertung: '
                textLabel.style.width = '100px'
                textDiv.appendChild(textLabel);
        
                const textInput = document.createElement('input');
                textInput.style.width = '95%'
                textInput.type = 'text';
                textInput.name = buchung.BuchungId + '-text';
                textInput.required = true;
        
                textDiv.appendChild(textInput);
                form.appendChild(textDiv);
        
                zweiteReihe.appendChild(form);
    
                const submitButton = document.createElement('button');
                submitButton.type = 'submit';
                submitButton.textContent = 'Speichern';
                form.appendChild(submitButton);
                form.addEventListener('submit', async function(event) {
                    event.preventDefault();
                    const sterne = this[0].value
                    const titel = this[1].value
                    const text = this[2].value
                    const bId = buchung.BuchungId
                    
        
                    const review = {id: LoggedInUser.Id, rating: sterne, titel: titel, text: text, bId: bId}
                    console.log(review)
                    RequestPHP('POST', 'KundePost.php?req=BewertungHinzufügen', (data)=>{
                        if (JSON.parse(data)=="ok"){
                            alert('Bewertung erfolgreich angelegt!');
                        }
                    }, (error)=>{
                        console.log('rückgabe mit error',error)
                    }, JSON.stringify(review))
            
                    emptyContainer(container)
                    let test = false
                    test = await loadData()
                    if(test === true){
                        createBewertungForm()
                        test = false
                    }
                });
        
                bewertungsDiv.appendChild(ersteReihe);
                bewertungsDiv.appendChild(zweiteReihe);
        
                abzugebendeBewertungenDiv.appendChild(bewertungsDiv)
            }else{
                if(new Date(buchung.Abreise) > new Date()){
                    counter2 = counter2 +1

                    const buchungContainer = document.createElement('div');
                    buchungContainer.className = 'buchungsContainerProfile'
                    buchungContainer.style.display = 'grid'
                    buchungContainer.style.gridTemplateColumns = '100px 240px 220px'

                    const nummerDiv = document.createElement('div')
                    nummerDiv.textContent = 'ID: ' + buchung.BuchungId + ''
                    nummerDiv.style.gridColumn = '1 / 2'
                    nummerDiv.style.paddingLeft = '5px'

                    const dauerDiv = document.createElement('div')
                    dauerDiv.textContent =  ''+ buchung.Anreise + ' - ' + buchung.Abreise + ''
                    dauerDiv.style.gridColumn = '2 / 3'
                    dauerDiv.style.paddingLeft = '5px'

                    const zimmerDiv = document.createElement('div')
                    zimmerDiv.textContent =  'Zimmer: ' + buchung.ZimmerName + ''
                    zimmerDiv.style.gridColumn = '3 / 4'
                    zimmerDiv.style.paddingLeft = '5px'
                    
                    buchungContainer.appendChild(nummerDiv)
                    buchungContainer.appendChild(dauerDiv)
                    buchungContainer.appendChild(zimmerDiv)

                    nichtAbgeschlossenDiv.appendChild(buchungContainer)
                }
            }
        })   
    }else{
        const fehlerDiv = document.createElement('div')
        fehlerDiv.innerText = 'Sie haben noch keine Buchungen'
        fehlerDiv.style.height = '30px'
        fehlerDiv.style.backgroundColor = 'red'
        container.appendChild(fehlerDiv)
    }
    if(counter1 === 0){
        const fehlerDiv = document.createElement('div')
        fehlerDiv.innerText = 'keiner ihrer Aufenthalte kann gerade bewertet werden'
        fehlerDiv.style.height = '30px'
        fehlerDiv.style.backgroundColor = 'red'
        abzugebendeBewertungenDiv.appendChild(fehlerDiv)
    }
    if(counter2 === 0){
        const fehlerDiv = document.createElement('div')
        fehlerDiv.innerText = 'Keine zukünftigen Aufenthalte gebucht'
        fehlerDiv.style.height = '30px'
        fehlerDiv.style.backgroundColor = 'red'
        nichtAbgeschlossenDiv.appendChild(fehlerDiv)
    }

    // aufenthalt abgeschlossen und bewertung gibt es schon
    const abgegebeneDiv = document.createElement('div')
    abgegebeneDiv.className = 'profileBewertungsContainer'
    abgegebeneDiv.style.width = '95%'

    const abgegebenH = document.createElement('h3')
    abgegebenH.className = 'ueberschriftBewertungsContainer'
    abgegebenH.textContent = 'Abgegebene Bewertungen:'
    abgegebenH.style.marginBottom = '0px'
    
    abgegebeneDiv.appendChild(abgegebenH)

    container.appendChild(abgegebeneDiv)
    
    if(ArrayBewertungen.length != 0){
        ArrayBewertungen.forEach(bewertung =>{

            const bewertungContainer = document.createElement('div');
            bewertungContainer.className = 'bewertungContainerProfil'
            bewertungContainer.style.display = 'grid'
            bewertungContainer.style.gridTemplateRows = '1fr 30px 1fr'
    
            const buchungInfoH = document.createElement('h4');
            buchungInfoH.textContent = 'Aufenthaltsbewertung für: '+bewertung.Zimmername + ' vom ' + bewertung.Anreise + ' - ' + bewertung.Abreise + ' mit einer Bewertung von '+ bewertung.Rating + ' von 5 Sternen'
            buchungInfoH.className = 'nameDiv';
    
            bewertungContainer.appendChild(buchungInfoH);

            const titelContainer = document.createElement('div')
            titelContainer.className = 'titelContainer'
            titelContainer.style.display = 'grid'
            titelContainer.style.gridTemplateColumns = '100px 1fr'

            const titelDiv = document.createElement('div')
            titelDiv.className = 'textContainer'
            titelDiv.textContent = 'Titel: '

            const titelTextarea = document.createElement('div');
            titelTextarea.className = 'textContainer';
            titelTextarea.readOnly = true;
            titelTextarea.textContent = bewertung.Titel;
            titelTextarea.style.width = '200px'

            titelContainer.appendChild(titelDiv)
            titelContainer.appendChild(titelTextarea)
    
            const textContainer = document.createElement('div')
            textContainer.className = 'bewertungContainer'
            textContainer.style.display = 'grid'
            textContainer.style.gridTemplateColumns = '100px 1fr'

            const textDiv = document.createElement('div')
            textDiv.className = 'textContainer'
            textDiv.textContent = 'Bewertung: '

            const textTextarea = document.createElement('div');
            textTextarea.className = 'textContainer';
            textTextarea.readOnly = true;
            textTextarea.textContent = bewertung.BewertungText;
            textTextarea.style.width = '90%'

            textContainer.appendChild(textDiv)
            textContainer.appendChild(textTextarea)
    
            bewertungContainer.appendChild(titelContainer);
            bewertungContainer.appendChild(textContainer);
    
            abgegebeneDiv.appendChild(bewertungContainer)
        }) 
    }else{
        const fehlerDiv = document.createElement('div')
        fehlerDiv.innerText = 'noch keine Bewertungen abgegeben'
        fehlerDiv.style.height = '30px'
        fehlerDiv.style.backgroundColor = 'red'
        abgegebeneDiv.appendChild(fehlerDiv)
    }
   
}

// Bei Klick auf "Alle meine Buchungen" im User Profil
// - erstellen des Grundaufbaus mit zwei Abschnitten auf den Daten von "BuchungenArray"
//   - Buchungen in der Zukunft
//   - Buchungen in der Vergangenheit
// - erstellen von Fehelrmeldugnen wenn in dem jeweiligen Abschnitt keine Daten da sind
function createBuchungenAnsicht(){
    const container = document.getElementById('contentSpace')
    emptyContainer(container)

    const zukunftDiv = document.createElement('div')
    zukunftDiv.className = 'profileBuchungsContainer'
    zukunftDiv.style.width = '95%'

    const zukunftH = document.createElement('h3')
    zukunftH.className = 'ueberschriftBuchungsContainer'
    zukunftH.textContent = 'Ihre anstehenden Aufenthalte:'
    zukunftH.style.marginBottom = '0px'
    
    zukunftDiv.appendChild(zukunftH)

    let zukünftigeBuchungen = ArrayBuchungen.filter(buchung => new Date(buchung.Anreise) > new Date())
    zukünftigeBuchungen.forEach(buchung => {

        const buchungContainer = document.createElement('div');
        buchungContainer.className = 'buchungsContainerProfile'
        buchungContainer.style.display = 'grid'
        buchungContainer.style.gridTemplateColumns = '100px 180px 165px 150px 100px 1fr'

        const nummerDiv = document.createElement('div')
        nummerDiv.textContent = 'ID: ' + buchung.BuchungId + ''
        nummerDiv.style.gridColumn = '1 / 2'
        nummerDiv.style.paddingLeft = '5px'

        const dauerDiv = document.createElement('div')
        dauerDiv.textContent =  ''+ buchung.Anreise + ' - ' + buchung.Abreise + ''
        dauerDiv.style.gridColumn = '2 / 3'
        dauerDiv.style.paddingLeft = '5px'

        const zimmerDiv = document.createElement('div')
        zimmerDiv.textContent =  'Zimmer: ' + buchung.ZimmerName + ''
        zimmerDiv.style.gridColumn = '3 / 4'
        zimmerDiv.style.paddingLeft = '5px'

        const preisDiv = document.createElement('div')
        preisDiv.textContent =  'Kosten: ' + buchung.Preis
        preisDiv.style.gridColumn = '4 / 5'
        preisDiv.style.paddingLeft = '5px'

        const buttonBDiv = document.createElement('div')
        buttonBDiv.style.gridColumn = '5 / 6'
        const bearbeitenButton = document.createElement('button')
        bearbeitenButton.textContent =  'bearbeiten'
        buttonBDiv.appendChild(bearbeitenButton)

        const buttonSDiv = document.createElement('div')
        buttonSDiv.style.gridColumn = '6 / 7'
        const stornierenButton = document.createElement('button')
        stornierenButton.textContent =  'stronieren'
        buttonSDiv.appendChild(stornierenButton)

        
        buchungContainer.appendChild(nummerDiv)
        buchungContainer.appendChild(dauerDiv)
        buchungContainer.appendChild(zimmerDiv)
        buchungContainer.appendChild(preisDiv)
        buchungContainer.appendChild(buttonBDiv)
        buchungContainer.appendChild(buttonSDiv)
        zukunftDiv.appendChild(buchungContainer)
    })
    container.appendChild(zukunftDiv)

    const vergangenDiv = document.createElement('div')
    vergangenDiv.className = 'profileBuchungsContainer'
    vergangenDiv.style.width = '95%'

    const vergangenH = document.createElement('h3')
    vergangenH.className = 'ueberschriftBuchungsContainer'
    vergangenH.textContent = 'Ihre vergangenen Buchungen:'
    vergangenH.style.marginBottom = '0px'
    
    vergangenDiv.appendChild(vergangenH)

    let vergangeneBuchungen = ArrayBuchungen.filter(buchung => new Date(buchung.Abreise) < new Date())
    vergangeneBuchungen.forEach(buchung => {
        const buchungContainer = document.createElement('div');
        buchungContainer.className = 'buchungsContainerProfile'
        buchungContainer.style.display = 'grid'
        buchungContainer.style.gridTemplateColumns = '100px 180px 165px 150px 1fr'

        const nummerDiv = document.createElement('div')
        nummerDiv.textContent = 'ID: ' + buchung.BuchungId + ''
        nummerDiv.style.gridColumn = '1 / 2'
        nummerDiv.style.paddingLeft = '5px'

        const dauerDiv = document.createElement('div')
        dauerDiv.textContent =  ''+ buchung.Anreise + ' - ' + buchung.Abreise + ''
        dauerDiv.style.gridColumn = '2 / 3'
        dauerDiv.style.paddingLeft = '5px'

        const zimmerDiv = document.createElement('div')
        zimmerDiv.textContent =  'Zimmer: ' + buchung.ZimmerName + ''
        zimmerDiv.style.gridColumn = '3 / 4'
        zimmerDiv.style.paddingLeft = '5px'

        const preisDiv = document.createElement('div')
        preisDiv.textContent =  'Kosten: ' + buchung.Preis
        preisDiv.style.gridColumn = '4 / 5'
        preisDiv.style.paddingLeft = '5px'
        
        buchungContainer.appendChild(nummerDiv)
        buchungContainer.appendChild(dauerDiv)
        buchungContainer.appendChild(zimmerDiv)
        buchungContainer.appendChild(preisDiv)
        vergangenDiv.appendChild(buchungContainer)
    })
    container.appendChild(vergangenDiv)
}

// Bei Klick auf "Zurück zu den Zimmern" im User Profil
// - zurücksetzen des Filtermenüs auf der linken Seite
// - neues anzeigen der Zimmerliste
function backToSearch(){
    const content = document.getElementById('contentSpace')
    emptyContainer(content)
    const filterGrid = document.getElementById('filterGrid')
    emptyContainer(filterGrid)
    createZimmerFilterMenü()
    createZimmerListe()
}

// Erstellen des Filtermenüs für die Zimmersuche
function createZimmerFilterMenü(){
    const container = document.getElementById('filterGrid')
    emptyContainer(container)

    // Datumsauswahl
    const datumsauswahlDiv = document.createElement('div');
    datumsauswahlDiv.className = 'filterItem';

    const auswahlText = document.createElement('p');
    auswahlText.style.margin = '10px 0px 3px 0px'
    auswahlText.textContent = 'Reisezeitraum:';
    datumsauswahlDiv.appendChild(auswahlText);

    const startLabel = document.createElement('label');
    startLabel.setAttribute('for', 'dateStart');
    startLabel.textContent = 'Start:';
    datumsauswahlDiv.appendChild(startLabel);

    const startInput = document.createElement('input');
    startInput.type = 'date';
    startInput.id = 'dateStart';
    startInput.name = 'date';
    datumsauswahlDiv.appendChild(startInput);

    const endLabel = document.createElement('label');
    endLabel.setAttribute('for', 'dateEnd');
    endLabel.textContent = 'Ende:';
    datumsauswahlDiv.appendChild(endLabel);

    const endInput = document.createElement('input');
    endInput.type = 'date';
    endInput.id = 'dateEnd';
    endInput.name = 'date';
    datumsauswahlDiv.appendChild(endInput);

    container.appendChild(datumsauswahlDiv);

    // Dropdown für Kategorieauswahl
    const kategorieDiv = document.createElement('div')
    kategorieDiv.className = 'filterItem'

    const kategorieLabel = document.createElement('label');
    kategorieLabel.className = 'filterLabel'
    kategorieLabel.setAttribute('for', 'kategorie');
    kategorieLabel.textContent = 'Kategorieauswahl:';
    kategorieDiv.appendChild(kategorieLabel);

    const kategorieSelect = document.createElement('select');
    kategorieSelect.className = 'selectDropDown'
    kategorieSelect.id = 'kategorie';
    kategorieSelect.name = 'kategorie';
    kategorieSelect.required = false;
   
    const optionElement0 = document.createElement('option');
    optionElement0.value = 'Alle';
    optionElement0.textContent = 'Alle';
    kategorieSelect.appendChild(optionElement0);
    const optionElementS = document.createElement('option');
    optionElementS.value = 'standard';
    optionElementS.textContent = 'Standard';
    kategorieSelect.appendChild(optionElementS);
    const optionElementP = document.createElement('option');
    optionElementP.value = 'premium';
    optionElementP.textContent = 'Premium';
    kategorieSelect.appendChild(optionElementP);
    const optionElementL = document.createElement('option');
    optionElementL.value = 'luxus';
    optionElementL.textContent = 'Luxus';
    kategorieSelect.appendChild(optionElementL)

    kategorieDiv.appendChild(kategorieSelect);

    container.appendChild(kategorieDiv)

    // Dropdown für Bettenauswahl
    const bettenauswahl = document.createElement('div')
    bettenauswahl.className = 'filterItem'

    const bettenLabel = document.createElement('label');
    bettenLabel.className = 'filterLabel'
    bettenLabel.setAttribute('for', 'betten');
    bettenLabel.textContent = 'Bettenauswahl:';
    bettenauswahl.appendChild(bettenLabel);

    const bettenSelect = document.createElement('select');
    bettenSelect.className = 'selectDropDown'
    bettenSelect.id = 'betten';
    bettenSelect.name = 'betten';
    bettenSelect.required = false;
   
    const optionElement = document.createElement('option');
    optionElement.value = 'Alle';
    optionElement.textContent = 'Alle';
    bettenSelect.appendChild(optionElement);
    const optionElement1 = document.createElement('option');
    optionElement1.value = 'einzelzimmer';
    optionElement1.textContent = 'Einzelzimmer';
    bettenSelect.appendChild(optionElement1);
    const optionElement2 = document.createElement('option');
    optionElement2.value = 'doppelzimmer';
    optionElement2.textContent = 'Doppelzimmer';
    bettenSelect.appendChild(optionElement2);

    bettenauswahl.appendChild(bettenSelect);

    container.appendChild(bettenauswahl)

    // Save
    const saveauswahl = document.createElement('div')
    saveauswahl.className = 'filterItem'
    saveauswahl.style.alignItems = 'center'
    const saveFilterButton = document.createElement('button')
    saveFilterButton.classList = 'filterItem'
    saveFilterButton.onclick = ()=> selectFilter()
    saveFilterButton.textContent = 'Filter anwenden'

    saveauswahl.appendChild(saveFilterButton)
    container.appendChild(saveauswahl)

}

// Bei Klick auf "Filter anwenden" in der Zimmerübersicht
// - auslesen der Filterdaten
// - übergabe der Fitlerdaten an Funktion "updateZimmerArray"
function selectFilter(){
    // Filterinputs über die ID der jeweiligen DOM-Elemente auf Variablen abspeichern
    const dateStart = document.getElementById('dateStart')
    const dateEnd = document.getElementById('dateEnd')
    const kategorie = document.getElementById('kategorie')
    const typ = document.getElementById('betten')

    // Die Werte der abgespeicherten Filterinputs an die "updateZimmerArray"-Methode übergeben
    updateZimmerArray(dateStart.value, dateEnd.value, kategorie.value, typ.value)
}

// Datenbankabfrage: Abspeichern der in SQL gefilterten Zimmerlsite mit den übergebenen Filtereinstellugnen in "ZimmerArray"
async function updateZimmerArray(dateStart, dateEnd, Kategorie, Typ){
    // Das DOM-Element das die alte Zimmerliste beinhaltet auf eine Variable speichern ...
    const container = document.getElementById('contentSpace')
    // ... und die Zimmerliste ablöschen
    emptyContainer(container)

    // Zusammenstellen der URL in dem Format wie sie das PHP-Script (welches die Datenbankabfrage macht) erwartet
    const url = "KundeSearch.php?req=Zimmer&start="+encodeURIComponent(dateStart)+"&end="+encodeURIComponent(dateEnd)+"&kategorie="+encodeURIComponent(Kategorie)+"&typ="+encodeURIComponent(Typ);
    // Aufrufen der Datenbankabfrage mit der erstellten URL die alle Filteroptionen erhält
    await RequestPHPAsync(url, (data)=>{
        // als "data" wird ein JSON mit allen passenden Zimmern zurückgeliefert, über JSON.parse in ein Array und dann zu debug-Zwecken erst in eine Variable ...
        const zimmer = JSON.parse(data)
        // ... und dann in unsere Globale Variable "ZimmerArray" abgespeichert wird ...
        ZimmerArray = zimmer
        // ... mit der "createZimmerListe" dann wieder arbeiten kann
        createZimmerListe()
    }, ()=>{})
}

// Erstellen des Filtermenüs oder besser Linkseite unter den Einstellungen des Nutzers
function createProfileFitlerMenü(){
    const container = document.getElementById('filterGrid')

    emptyContainer(container)

    const buttonsProfile = document.createElement('div')
    buttonsProfile.className = 'filterItem'

    const backButton = document.createElement('button')
    backButton.textContent = 'zurück zu den Zimmern'
    backButton.setAttribute('onclick', 'backToSearch()')

    buttonsProfile.appendChild(backButton)

    const buttonBuchungen = document. createElement('button')
    buttonBuchungen.textContent = 'Alle meine Buchungen'
    buttonBuchungen.setAttribute('onclick', 'createBuchungenAnsicht()')

    buttonsProfile.appendChild(buttonBuchungen)

    const buttonProfile = document. createElement('button')
    buttonProfile.textContent = 'Profil bearbeiten'
    buttonProfile.setAttribute('onclick', 'createProfileForm()')

    buttonsProfile.appendChild(buttonProfile)

    const buttonBewertung = document. createElement('button')
    buttonBewertung.textContent = 'Bewertung zu Buchung abgeben'
    buttonBewertung.setAttribute('onclick', 'createBewertungForm()')

    buttonsProfile.appendChild(buttonBewertung)

    container.appendChild(buttonsProfile)
}

// Hilfsfunktion um alle Kindelemente eines übergebenen HTML-Elements zu löschen
function emptyContainer(container){
    let länge = container.children.length
    for(let i = 0; i < länge; i++){
        container.removeChild(container.children[0])
    }
}