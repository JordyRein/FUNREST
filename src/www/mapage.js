// --------------------------------------------------------------------
// Anlegen von verschiedenen immer wieder genutzten Variablen
// --------------------------------------------------------------------

// Variablen für zwischenspeicherung der aus der Datenbank geladenen Daten
let ZimmerArray
let KundenArray
let BuchungenArray
let BewertungenArray
let loggedInUser
let loggedIn = false

// --------------------------------------------------------------------
// Ausführen von Funktionen die nach dem fertigen Laden der Website ausgeführt werden müssen anch dem ersten Starten
// --------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    let token;
    if((token=localStorage.getItem("token"))){
      const d = atob(token.split('.')[0]);
      loggedInUser=JSON.parse(d);

      closeLogin();
      return;
    }
    firstVisit();
    LoginRequest();
});

// --------------------------------------------------------------------
// Block aller verwendeten Funktionen
// --------------------------------------------------------------------

// Datenbankabfrage: Abspeichern der (gefilterten) Zimmer in "ZimmerArray"
async function fetchZimmer(suchbegriff){
    const url = "AdminSearch.php?req=Zimmer&search="+encodeURIComponent(suchbegriff);
    await RequestPHPAsync(url, (data)=>{
        const zimmer = JSON.parse(data)
        ZimmerArray = zimmer
    }, ()=>{})
}

// Datenbankabfrage: Abspeichern der (gefilterten) Kunden in "KundenArray"
async function fetchKunden(suchbegriff){
    const url = "AdminSearch.php?req=Kunde&search="+encodeURIComponent(suchbegriff);
    await RequestPHPAsync(url, (data)=>{
        const kunde = JSON.parse(data)
        KundenArray = kunde
    }, ()=>{})
}

// Datenbankabfrage: Abspeichern der (gefilterten) Buchungen in "BuchungenArray"
async function fetchBuchungen(suchbegriff){
    const url = "AdminSearch.php?req=Buchung&search="+encodeURIComponent(suchbegriff);
    await RequestPHPAsync(url, (data)=>{
        const buchung = JSON.parse(data)
        BuchungenArray = buchung
    }, ()=>{})
}

// Datenbankabfrage: Abspeichern der (gefilterten) Bewertungen in "BewertungenArray"
async function fetchBewertungen(suchbegriff){
    const url = "AdminSearch.php?req=Bewertung&open="+encodeURIComponent(suchbegriff);
    await RequestPHPAsync(url, (data)=>{
        const bewertung = JSON.parse(data)
        BewertungenArray = bewertung
    }, ()=>{})
}

// ???
function LoginRequest(){
  const popup = document.getElementById('popup');
  popup.style.display = 'flex';
  document.getElementById('LoginForm').addEventListener (
      "submit", 
      function (evt) {
        var fd = new FormData(document.getElementById('LoginForm'));

        //for security password should be hashed before sent to backend
        //await simpleHash(fd.get(password))
        //          .then(val=>{ 
        //              fd.set("password", val);
        //          });

        RequestPHP("POST", "AdminLogin.php",
            (data)=>{
              if(data==JSON.stringify("login_err_idpass")){
              alert("Id/Pass False");
              return;
              }

              const d = atob(JSON.parse(data).split('.')[0]);
              localStorage.setItem("token",JSON.parse(data));

              loggedInUser=JSON.parse(d);

              closeLogin()
              loggedIn = true
            },
            ()=>{
            },
            fd);

        evt.preventDefault();
      }
  );
}

// Erstellt das Login-Popup beim ersten Besuch der Seite und blendet den Login-Button aus
function firstVisit(){

    const headerbutton = document.getElementById('headerButton')
    headerbutton.style.display = 'none'

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

    loginDiv.appendChild(userLabel)
    loginDiv.appendChild(userInput)
    loginDiv.appendChild(passwordLabel)
    loginDiv.appendChild(passwordInput)
    loginDiv.appendChild(button)

    form.appendChild(loginDiv)

    loginContentDiv.appendChild(form)

    loginContainerDiv.appendChild(loginContentDiv)

    header[0].insertAdjacentElement("afterend",loginContainerDiv)
}

// Schließen des Login-Popups und erstellen der administrativen Kacheln
// toDo: gleichziehen mit Visitorpage
function closeLogin(){
    const body = document.getElementsByTagName('body')
    if(document.getElementById('popup')){
      body[0].removeChild(document.getElementById('popup'))
    }
    bluidToolgrid()

    const headerbutton = document.getElementById('headerButton')
    headerbutton.style.display = 'flex'
}

// Bei Klick auf "Suchen", auf administrativer Kachel Kunde
// - Erstellen der Tabelle mit allen Kundendaten die dem Suchbegriff entsprechen (bei nichts alle)
async function getKunde(suchbegriff){
    await fetchKunden(suchbegriff).then((value)=>{
        clearDataGrid()
        const dataGrid = document.getElementById('dataGrid')

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        ['Kundennummer', 'Name', 'Geburtsdatum', ''].forEach((headerText) => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        KundenArray.forEach(kunde => {
            const row = document.createElement('tr');
            const cellID = document.createElement('td');
            cellID.textContent = kunde.Id;
            row.appendChild(cellID);
            const cellName = document.createElement('td');
            cellName.textContent = kunde.LastName + ', ' + kunde.FirstName;
            row.appendChild(cellName);
            const cellGebDatum = document.createElement('td');
            cellGebDatum.textContent = kunde.Birthday;
            row.appendChild(cellGebDatum);
            const button = document.createElement('button')
            button.id = kunde.Id
            button.textContent = 'Bearbeiten'
            button.onclick = ()=> changeKundenProfil(kunde.Id)
            row.appendChild(button)

            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        
        dataGrid.appendChild(table);
    })
    
}

// Bei Klick auf "Bearbeiten" neben einen Kunden in der Kundentabelle
// - ablöschen der Kundentabelle
// - erstellen einer "Form" mit allen aktuellen Nutzerdaten des übergebenen Nutzers
// - aktualiseren der Nutzerdaten in der Datenbank
function changeKundenProfil(idKunde){
    clearDataGrid()
    let zuändernderKunde = KundenArray.filter(kunde => kunde.Id === idKunde)
    console.log(zuändernderKunde[0])
    const dataGrid = document.getElementById('dataGrid')

    const form = document.createElement('form');
    form.id = 'profileForm';

    const fields = [
        { label: 'Vorname:', id: 'firstName', type: 'text', value: zuändernderKunde[0].FirstName},
        { label: 'Nachname:', id: 'lastName', type: 'text', value: zuändernderKunde[0].LastName},
        { label: 'Straße & Hausnummer:', id: 'street', type: 'text', value: zuändernderKunde[0].Address},
        { label: 'PLZ:', id: 'zipCode', type: 'text', pattern: '[0-9]*', value: zuändernderKunde[0].PLZ},
        { label: 'Stadt:', id: 'city', type: 'text', value: zuändernderKunde[0].Location}
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.textContent = field.label;
        form.appendChild(label);

        const input = document.createElement('input');
        input.type = field.type;
        input.id = field.id;
        input.name = field.id;
        input.value = field.value
        input.required = true;
        if (field.pattern) input.pattern = field.pattern;
        form.appendChild(input);
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
   
    const optionElement = document.createElement('option');
    optionElement.value = 'keine Angabe';
    optionElement.textContent = 'keine Angabe';
    genderSelect.appendChild(optionElement);
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

    switch (zuändernderKunde[0].Sex) {
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
    birthDateInput.required = true;
    birthDateInput.value = formatDateForInput(zuändernderKunde[0].Birthday)
    form.appendChild(birthDateInput);

    // Submit Button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Speichern';
    form.appendChild(submitButton);
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const newKunde = {
            Id: zuändernderKunde[0].Id,
            FirstName: this[0].value,
            LastName: this[1].value,
            Address: this[2].value,
            PLZ: this[3].value,
            City: this[4].value,
            Sex: this[5].value,
            Birthdate: this[6].value,
            Code:"E"
        }
        //Hier die Speicherfunktion zur Datenbank
        RequestPHP('POST', 'AdminDataSubmit.php?search=Kunde', 
                  (data)=>{
                    if(JSON.parse(data)=="ok"){
                      alert('Profil erfolgreich angelegt!');
                    }
                    else{
                      alert(data);
                    }

                  },
                   ()=>{}, 
                  JSON.stringify(newKunde))

        clearDataGrid()
    });

    dataGrid.appendChild(form);
}

// Bei Klick auf "Bearbeiten" neben einer Buchung in der Buchungstabelle
// - ablöschen der Buchungstabelle
// - erstellen einer "Form" mit allen aktuellen Daten der Buchung
// - aktualiseren der Buchung in der Datenbank
async function changeBuchung(id){
    clearDataGrid()

    let newBuchungChange = newBuchungen.find(b=>b.BuchungId == id);
    clearDataGrid()
    const dataGrid = document.getElementById('dataGrid')

    const form = document.createElement('form');
    form.id = 'buchungForm';

    const fields = [
        {  label: 'Kunde Vorname:',
           id: 'firstName', 
           type: 'text', 
           value: newBuchungChange.KundeVorname
        },
        { label: 'Kunde Nachname:', 
          id: 'lastName', 
          type: 'text', 
          value: newBuchungChange.KundeNachname
        }
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.textContent = field.label;
        form.appendChild(label);

        const input = document.createElement('input');
        input.type = field.type;
        input.id = field.id;
        input.name = field.id;
        input.value = field.value;
        input.required = true;
        if (field.pattern) input.pattern = field.pattern;
        form.appendChild(input);
    });

    // Zimmer
    const zimmerLabel = document.createElement('label');
    zimmerLabel.setAttribute('for', 'zimmer');
    zimmerLabel.textContent = 'Zimmer:';
    form.appendChild(zimmerLabel);

    const zimmerSelect = document.createElement('select');
    zimmerSelect.id = 'zimmer';
    zimmerSelect.name = 'zimmer';
    zimmerSelect.required = true;

    await fetchZimmer("").then(()=>{
    ZimmerArray.forEach(zimmer =>{
        const optionZimmer = document.createElement('option');
        optionZimmer.value = zimmer.Name;
        optionZimmer.textContent = zimmer.Kategorie + ': ' + zimmer.Name;
        zimmerSelect.appendChild(optionZimmer);
    });
    zimmerSelect.value = newBuchungChange.ZimmerName;
    form.appendChild(zimmerSelect);

    });

    // Anreisedatum
    const anreisedatumLabel = document.createElement('label');
    anreisedatumLabel.setAttribute('for', 'anreisedatum');
    anreisedatumLabel.textContent = 'anreisedatum:';
    form.appendChild(anreisedatumLabel);

    const anreisedatumInput = document.createElement('input');
    anreisedatumInput.type = 'date';
    anreisedatumInput.id = 'anreiseDate';
    anreisedatumInput.name = 'anreiseDate';
    anreisedatumInput.value = newBuchungChange.Anreise
    anreisedatumInput.required = true;
    form.appendChild(anreisedatumInput);

    // Anreisedatum
    const abreisedatumLabel = document.createElement('label');
    abreisedatumLabel.setAttribute('for', 'abreisedatum');
    abreisedatumLabel.textContent = 'abreisedatum:';
    form.appendChild(abreisedatumLabel);

    const abreisedatumInput = document.createElement('input');
    abreisedatumInput.type = 'date';
    abreisedatumInput.id = 'abreiseDate';
    abreisedatumInput.name = 'abreiseDate';
    abreisedatumInput.value = newBuchungChange.Abreise
    abreisedatumInput.required = true;
    form.appendChild(abreisedatumInput);

    // Submit Button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Edit Buchung';
    form.appendChild(submitButton);
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const changeBuchung = {
            Id: id,
            KID: newBuchungChange.KundeId,
            FirstName: this[0].value,
            LastName: this[1].value,
            Zimmer: this[2].value,
            anreise: this[3].value,
            abreise: this[4].value,
            MID: loggedInUser.Id,
            ReviewId: newBuchungChange.BewertungsId,
            Code:"E"
        }

        RequestPHP('POST', 'AdminDataSubmit.php?search=Buchung', 
            (data)=>{
              console.log(data);
            }, 
            ()=>{}, 
            JSON.stringify(changeBuchung))

        alert('Buchung erfolgreich geaendert!');
        clearDataGrid()

    });

    dataGrid.appendChild(form);
}

// Bei Klick auf "Kunde anlegen" auf administrative Kachel Kunde
// - erstellen einer "Form" für alle Daten des Kunden
function addKunde(){
    clearDataGrid()
    const dataGrid = document.getElementById('dataGrid')

    const form = document.createElement('form');
    form.id = 'profileForm';

    const fields = [
        { label: 'Username:', id: 'uName', type: 'text'},
        { label: 'Password:', id: 'pass', type: 'password'},
        { label: 'Vorname:', id: 'firstName', type: 'text'},
        { label: 'Nachname:', id: 'lastName', type: 'text'},
        { label: 'Straße & Hausnummer:', id: 'street', type: 'text'},
        { label: 'PLZ:', id: 'zipCode', type: 'text', pattern: '[0-9]*'},
        { label: 'Stadt:', id: 'city', type: 'text'}
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.textContent = field.label;
        form.appendChild(label);

        const input = document.createElement('input');
        input.className = 'toolgridInput'
        input.type = field.type;
        input.id = field.id;
        input.name = field.id;
        input.required = true;
        if (field.pattern) input.pattern = field.pattern;
        form.appendChild(input);
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
   
    const optionElement = document.createElement('option');
    optionElement.value = 'keine Angabe';
    optionElement.textContent = 'keine Angabe';
    genderSelect.appendChild(optionElement);
    const optionElementM = document.createElement('option');
    optionElementM.value = 'männlich';
    optionElementM.textContent = 'männlich';
    genderSelect.appendChild(optionElementM);
    const optionElementW = document.createElement('option');
    optionElementW.value = 'weiblich';
    optionElementW.textContent = 'weiblich';
    genderSelect.appendChild(optionElementW);
    const optionElementD = document.createElement('option');
    optionElementD.value = 'divers';
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
    submitButton.textContent = 'Speichern';
    form.appendChild(submitButton);
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var sx = this[7].value == "weiblich"?"F":this[7].value == "männlich" ? "M" : "D";
        const newKunde = {
            Id: -1,
            FirstName: this[2].value,
            LastName: this[3].value,
            Address: this[4].value,
            PLZ: this[5].value,
            City: this[6].value,
            Sex: sx,
            Birthdate: this[8].value,
            Code:"A",
            usr:this[0].value,
            pw:this[1].value
        }
        //Hier die Speicherfunktion zur Datenbank
        RequestPHP('POST', 'AdminDataSubmit.php?search=Kunde',
                   (data)=>{
                    if(JSON.parse(data)=="ok"){
                      alert('Profil erfolgreich angelegt!');
                    }
                    else{
                      alert(data);
                    }
                   }, 
                   ()=>{}, 
                   JSON.stringify(newKunde))

        //alert('Profil erfolgreich angelegt!');
        clearDataGrid()
    });

    dataGrid.appendChild(form);
    
}

// Bei Klick auf "Suchen" auf administrativer Kachel Zimmer
// - Erstellen der Tabelle mit allen Zimmerdaten die dem Suchbegriff entsprechen (bei nichts alle)
async function getZimmer(suchbegriff){
    await fetchZimmer(suchbegriff).then((value)=>{
        clearDataGrid()
        const dataGrid = document.getElementById('dataGrid')

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        // Objekt, das den Sortierungszustand für jede Spalte speichert
        const sortStates = {};

        ['ID', 'Name', 'Betten', 'Kategorie', 'Preis', 'Bildpfad'].forEach((headerText, index) => {
            const th = document.createElement('th');
            th.textContent = headerText;
            
            const sortIndicator = document.createElement('span');
            sortIndicator.className = 'sort-indicator sort-none';
            th.appendChild(sortIndicator);

            th.addEventListener('click', () => {
                sortStates[headerText.toLowerCase()] = (sortStates[headerText.toLowerCase()] || 0) + 1;
                if (sortStates[headerText.toLowerCase()] > 2) {
                    sortStates[headerText.toLowerCase()] = 0;
                }
                sortTable(headerText.toLowerCase(), index, sortStates[headerText.toLowerCase()]);

                // Update des Sortierungsindikators
                const indicators = document.querySelectorAll('.sort-indicator');
                indicators.forEach(ind => {
                    ind.className = 'sort-indicator sort-none';
                });
                if (sortStates[headerText.toLowerCase()] === 1) {
                    sortIndicator.className = 'sort-indicator sort-desc';
                } else if (sortStates[headerText.toLowerCase()] === 2) {
                    sortIndicator.className = 'sort-indicator sort-asc';
                }
            });
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        ZimmerArray.forEach(rowData => {
            const row = document.createElement('tr');
            Object.values(rowData).forEach(cellData => {
                const cell = document.createElement('td');
                cell.textContent = cellData;
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        // Sortierungsfunktion mit Sortierungszustand
        function sortTable(column, columnIndex, sortState) {
            let rows = Array.from(tbody.getElementsByTagName('tr'));
            let sortedRows = rows.sort((a, b) => {
                let aCol = a.getElementsByTagName('td')[columnIndex].textContent;
                let bCol = b.getElementsByTagName('td')[columnIndex].textContent;

                if (column === 'preis') {
                    aCol = parseFloat(aCol.replace('€', ''));
                    bCol = parseFloat(bCol.replace('€', ''));
                }

                if (sortState === 1) {  // Absteigend
                    return bCol > aCol ? 1 : -1;
                } else if (sortState === 2) {  // Aufsteigend
                    return aCol > bCol ? 1 : -1;
                } else {  // Sortierung zurücksetzen (Originalreihenfolge)
                    return ZimmerArray.indexOf(JSON.parse(JSON.stringify(Object.assign({}, {name: aCol, kategorie: b.getElementsByTagName('td')[1].textContent, betten: b.getElementsByTagName('td')[2].textContent, preis: b.getElementsByTagName('td')[3].textContent})))) - 
                    ZimmerArray.indexOf(JSON.parse(JSON.stringify(Object.assign({}, {name: bCol, kategorie: a.getElementsByTagName('td')[1].textContent, betten: a.getElementsByTagName('td')[2].textContent, preis: a.getElementsByTagName('td')[3].textContent})))) 
                }
            });
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }
            sortedRows.forEach(row => {
                tbody.appendChild(row);
            });
        }
            // Füge die Tabelle zum Body hinzu
            dataGrid.appendChild(table);
    })
    
}

// Bei Klick auf "Suchen" auf administrativer Kachel Buchung
// - Erstellen der Tabelle mit allen Buchungen die dem Suchbegriff entsprechen (bei nichts alle)
async function getBuchung(suchbegriff){
    await fetchBuchungen(suchbegriff).then((value)=>{
        //console.log(newBuchungen)
        clearDataGrid()

        const dataGrid = document.getElementById('dataGrid')

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        ['ID', 'Kunde', 'Zimmer', 'Preis', 'Anreise', 'Abreise'].forEach((headerText) => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        BuchungenArray.forEach(rowData => {
            const row = document.createElement('tr');

            const cellId = document.createElement('td')
            cellId.textContent = rowData.BuchungId;
            row.appendChild(cellId);

            const cellKunde = document.createElement('td')
            cellKunde.textContent = rowData.KundeNachname + ', ' + rowData.KundeVorname;
            row.appendChild(cellKunde);

            const cellZimmer = document.createElement('td')
            // cellZimmer.textContent = rowData.zimmer.kategorie + ': ' + rowData.zimmer.name;
            cellZimmer.textContent = rowData.ZimmerName
            row.appendChild(cellZimmer);

            const cellPreis = document.createElement('td')
            let preis = parseInt(rowData.BuchungZeitRaum) * parseInt(rowData.Preis)
            cellPreis.textContent = preis
            row.appendChild(cellPreis);

            const cellAnreise = document.createElement('td')
            // let date = rowData.Anreise.getDate().toString().padStart(2, '0') + '.' + (rowData.Anreise.getMonth() + 1).toString().padStart(2, '0') + '.' + rowData.Anreise.getFullYear()
            cellAnreise.textContent = rowData.Anreise
            row.appendChild(cellAnreise);

            const cellAbreise = document.createElement('td')
            // date = rowData.Abreise.getDate().toString().padStart(2, '0') + '.' + (rowData.Abreise.getMonth() + 1).toString().padStart(2, '0') + '.' + rowData.Abreise.getFullYear()
            cellAbreise.textContent = rowData.Abreise
            row.appendChild(cellAbreise);

            const cellButton = document.createElement('td')

            const button = document.createElement('button')
            button.style.margin = '0px'
            button.id = rowData.BuchungId
            button.textContent = 'Bearbeiten'
            button.onclick = ()=> changeBuchung(rowData.BuchungId)
            cellButton.appendChild(button)
            row.appendChild(cellButton)

            const cellButtonR = document.createElement('td')
            const buttonR = document.createElement('button');
            buttonR.style.margin = '0px'
            buttonR.id = rowData.BuchungId;
            buttonR.textContent = 'Rechnung';
            buttonR.onclick = ()=> createReceipt(rowData);
            cellButtonR.appendChild(buttonR)
            row.appendChild(cellButtonR);

            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        // Füge die Tabelle zum Body hinzu
        dataGrid.appendChild(table);
    })
        

}

// ???
function createReceipt(buchung){

    //Code Jordi auskommentiert und durch Code von Grok ersetzt da keine Zeit die grafische oberflöche selber zu amchen
        //   const receipt = window.open("","","height=600, width=800");
        //   const content = 
        //     "<h1> FUNREST </h1>" + 
        //     "Vorname = " + buchung.KundeVorname + "<br>" +
        //     "Nachname = " + buchung.KundeNachname + "<br>" +
        //     "ZimmerName = " + buchung.ZimmerName + "<br>" +
        //     "Preis = " + buchung.Preis * buchung.BuchungZeitRaum;

        //   receipt.document.write('<html><head><title>Rechnung</title>');
        //   receipt.document.write('<style>body { font-family: Arial, sans-serif; }</style>');
        //   receipt.document.write('</head><body>');
        //   receipt.document.write(content);
        //   receipt.document.write('</body></html>');

        //   receipt.document.close();

        //   receipt.onload = ()=>{
        //     receipt.print();
        //     receipt.close();
        //   }

    const receipt = window.open("", "", "height=800, width=600");

    // HTML-Inhalt der Rechnung
    const content = `
        <html>
        <head>
            <title>Rechnung - FUNREST</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    border: 1px solid #ccc;
                    padding: 20px;
                    background: #fff;
                }
                .header {
                    text-align: center;
                    border-bottom: 2px solid #003087;
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                }
                .header img {
                    max-height: 60px;
                }
                .header h1 {
                    margin: 10px 0;
                    color: #003087;
                    font-size: 24px;
                }
                .details-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                .details-table th, .details-table td {
                    padding: 8px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                .details-table th {
                    background: #f5f5f5;
                    width: 40%;
                }
                .total {
                    text-align: right;
                    font-size: 18px;
                    font-weight: bold;
                    margin-top: 20px;
                }
                .footer {
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                    margin-top: 30px;
                    border-top: 1px solid #ddd;
                    padding-top: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="LogoFUNREST.png" alt="FUNREST Logo">
                    <h1>FUNREST Hotelkette</h1>
                    <p>Rechnung für Ihre Buchung</p>
                </div>

                <table class="details-table">
                    <tr>
                        <th>Rechnungsnummer</th>
                        <td>${buchung.BuchungId}</td>
                    </tr>
                    <tr>
                        <th>Kunde</th>
                        <td>${buchung.KundeId}</td>
                        <td>${buchung.KundeNachname}, </td>
                        <td>${buchung.KundeVorname}</td>
                    </tr>
                    <tr>
                        <th>Zimmer</th>
                        <td>${buchung.ZimmerName}</td>
                    </tr>
                    <tr>
                        <th>Aufenthaltsdauer</th>
                        <td>${buchung.BuchungZeitRaum} Nächte</td>
                    </tr>
                    <tr>
                        <th>Startdatum</th>
                        <td>${new Date(buchung.Anreise).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <th>Enddatum</th>
                        <td>${new Date(buchung.Abreise).toLocaleDateString()}</td>
                    </tr>
                </table>

                <div class="total">
                    Gesamtbetrag: ${buchung.Preis} € 
                </div>

                <div class="footer">
                    <p>FUNREST Hotelkette | Funrest Straße 1, 12345 Urlaubstadt</p>
                    <p>Email: info@funrest.com | Telefon: +49 123 456789</p>
                    <p>© 2025 FUNREST. Alle Rechte vorbehalten.</p>
                </div>
            </div>
        </body>
        </html>
    `;

    // Schreibe Inhalt ins neue Fenster
    receipt.document.write(content);
    receipt.document.close();

    // Drucken und Schließen nach Laden
    receipt.onload = () => {
        receipt.print();
        receipt.close();
    };
}

// Bei Klick auf "Buchung hinzufügen" auf administrativer Kachel Buchung
// - Erstellen einer "Form" für alle Daten einer Buchung
async function addBuchung(){
    await fetchZimmer("").then((value)=>{
        clearDataGrid()
        const dataGrid = document.getElementById('dataGrid')

        const form = document.createElement('form');
        form.id = 'buchungForm';

        const fields = [
            { label: 'Kunde Id:', id: 'kid', type: 'text'},
            { label: 'Kunde Vorname:', id: 'firstName', type: 'text'},
            { label: 'Kunde Nachname:', id: 'lastName', type: 'text'}
        ];

        fields.forEach(field => {
            const label = document.createElement('label');
            label.setAttribute('for', field.id);
            label.textContent = field.label;
            form.appendChild(label);

            const input = document.createElement('input');
            input.className = 'toolgridInput'
            input.type = field.type;
            input.id = field.id;
            input.name = field.id;
            input.required = true;
            if (field.pattern) input.pattern = field.pattern;
            form.appendChild(input);
        });

        // Zimmer
        const zimmerLabel = document.createElement('label');
        zimmerLabel.setAttribute('for', 'zimmer');
        zimmerLabel.textContent = 'Zimmer:';
        form.appendChild(zimmerLabel);

        const zimmerSelect = document.createElement('select');
        zimmerSelect.id = 'zimmer';
        zimmerSelect.name = 'zimmer';
        zimmerSelect.required = true;
    
        ZimmerArray.forEach(zimmer =>{
            const optionZimmer = document.createElement('option');
            optionZimmer.value = zimmer.Name;
            optionZimmer.textContent = zimmer.Kategorie + ': ' + zimmer.Name;
            zimmerSelect.appendChild(optionZimmer);
        })

        form.appendChild(zimmerSelect);

        // Anreisedatum
        const anreisedatumLabel = document.createElement('label');
        anreisedatumLabel.setAttribute('for', 'anreisedatum');
        anreisedatumLabel.textContent = 'anreisedatum:';
        form.appendChild(anreisedatumLabel);

        const anreisedatumInput = document.createElement('input');
        anreisedatumInput.type = 'date';
        anreisedatumInput.id = 'anreiseDate';
        anreisedatumInput.name = 'anreiseDate';
        anreisedatumInput.required = true;
        form.appendChild(anreisedatumInput);

        // Anreisedatum
        const abreisedatumLabel = document.createElement('label');
        abreisedatumLabel.setAttribute('for', 'abreisedatum');
        abreisedatumLabel.textContent = 'abreisedatum:';
        form.appendChild(abreisedatumLabel);

        const abreisedatumInput = document.createElement('input');
        abreisedatumInput.type = 'date';
        abreisedatumInput.id = 'abreiseDate';
        abreisedatumInput.name = 'abreiseDate';
        abreisedatumInput.required = true;
        form.appendChild(abreisedatumInput);

        // Submit Button
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'erstellen der Buchung';
        form.appendChild(submitButton);
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const newBuchung = {
                Id: -1,
                KID:this[0].value,
                FirstName: this[1].value,
                LastName: this[2].value,
                Zimmer: this[3].value,
                anreise: this[4].value,
                abreise: this[5].value,
                MID:loggedInUser.Id,
                Code:"A"
            }

            //Hier die Speicherfunktion zur Datenbank
            RequestPHP('POST', 'AdminDataSubmit.php?search=Buchung', 
                       (data)=>{
                          console.log(data);
                       }, 
                       ()=>{}, 
                       JSON.stringify(newBuchung))

            alert('Buchung erfolgreich angelegt!');
            clearDataGrid()
        });

        dataGrid.appendChild(form);
    })    
}

// Bei Klick auf "Offene/Alle Bewertungen" auf administrativer Kachel Bewertung
// - Erstellen je einer BewertungsKachel für alle Bewertungen
// - bei offene = 0: Für alle nicht freigegeneben Bewertungen
// - bei offene = false: Für ALLE Bewertungen
async function getBewertungen(offene){
    //console.log(offene)
    await fetchBewertungen(offene).then((value)=>{
        //console.log(newBewertungen)
        clearDataGrid()
        const dataGrid = document.getElementById('dataGrid')

        //newBewertungen.filter(bw=>bw);

        BewertungenArray.forEach(bewertung => {
            const bewertungsDiv = document.createElement('div')
            bewertungsDiv.className = 'bewertungContainer'
            bewertungsDiv.style.width = '90%'

            const ersteReihe = document.createElement('div');
            ersteReihe.className = 'ersteReihe';

            const nameSpan = document.createElement('span');
            nameSpan.textContent = bewertung.KundeNachname + ', ' + bewertung.KundeVorname;
            nameSpan.className = 'nameSpan';

            const checkboxDiv = document.createElement('div');
            checkboxDiv.className = 'checkboxContainer';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkboxInput';
            checkbox.addEventListener("change", ()=>{
              releaseBewertung(checkbox, bewertung.BewertungId);
            });
            if(bewertung.Status === "0"){
                checkbox.checked = false
            }else{
                checkbox.checked = true
            }
            const checkboxLabel = document.createElement('label');
            checkboxLabel.id = bewertung.id;
            checkboxLabel.textContent = 'Freigeben';
            checkboxLabel.className = 'checkboxSpan';

            checkboxDiv.appendChild(checkbox);
            checkboxDiv.appendChild(checkboxLabel);
            
            const sterneSpan = document.createElement('span');
            sterneSpan.textContent = bewertung.Rating + ' von 5 Sternen'
            sterneSpan.className = 'sterneSpan';

            ersteReihe.appendChild(nameSpan);
            ersteReihe.appendChild(checkboxDiv);
            ersteReihe.appendChild(sterneSpan);

            const zweiteReihe = document.createElement('div');
            zweiteReihe.className = 'zweiteReihe';

            const textarea = document.createElement('textarea');
            textarea.className = 'textBewertung';
            textarea.readOnly = true;
            textarea.value = bewertung.BewertungText;

            zweiteReihe.appendChild(textarea);

            bewertungsDiv.appendChild(ersteReihe);
            bewertungsDiv.appendChild(zweiteReihe);

            dataGrid.appendChild(bewertungsDiv)
        })
        adjustTextareaHeight()
    })
    
}

// Bei Klick auf checkbox "freigegeben"
// - aktualisierung des Status in der Datenbank
function releaseBewertung(checkbox, id){
    const fd= new FormData();
    fd.append("Value", checkbox.checked? 1:0);
    fd.append("BewertungId", id);
    fd.append("MitarbeiterId", loggedInUser.Id);
    fd.append("Token", localStorage.getItem("token"));

    RequestPHP("POST", "SetReviewOK.php", 
      (data)=>{
      },
      (err)=>{
        checkbox.checked=!checkbox.checked;
        switch(err){
          case 400:
            alert("Bad Request");
            break;
          case 401:
            alert("Unauthorized");
            break;
          case 403:
            alert("Unauthenticated");
            break;
          default:
            alert("Not found");
            break;
        }
      },
      fd
    );

    //Hier einfügen, dass die Freigabe geändert wurde, sodass es auf der frontpage angezeigt wird
    ////changeFreigabestatus(idBewertung, checkbox.checked)
    if(checkbox.checked === true){
        clearDataGrid()
        getBewertungen('0')
    }else{
        clearDataGrid()
        getBewertungen('1')
    }
}

// Erstellen der administrativen Kacheln
// - wenn loggedInUser Admin ist mit der zusätzlichen Kachel für Bewertungen
function bluidToolgrid(){
    const toolGrid = document.getElementById('toolGrid') 
    if(loggedInUser.Role === 'Admin'){
        toolGrid.style.gridTemplateColumns = '25% 25% 25% 25%'
    }else{
        toolGrid.style.gridTemplateColumns = '33% 33% 33%'
    }

    const filterBoxKundeDiv = document.createElement('div')
    filterBoxKundeDiv.className = 'filterBox'
    filterBoxKundeDiv.id = 'kundeFilter'

    const kundeH2 = document.createElement('h2')
    kundeH2.className = 'überschriftToolgrid'
    kundeH2.textContent = 'Kunde'
    kundeH2.style.gridRow = '1 / 2'

    const kundeInput = document.createElement('input')
    kundeInput.className = 'searchInput'
    kundeInput.type = 'text'
    kundeInput.id = 'kundeSuchInput'
    kundeInput.placeholder = 'Nachnahme/Kundennummer'
    kundeInput.style.gridRow = '2 / 3'

    const suchKundeButton = document.createElement('button')
    suchKundeButton.className = 'suchButton'
    suchKundeButton.type = 'button'
    suchKundeButton.onclick = ()=> getKunde(document.getElementById('kundeSuchInput').value)
    suchKundeButton.textContent = 'Suchen'
    suchKundeButton.style.gridRow = '2 / 3'

    const addKundeButton = document.createElement('button')
    addKundeButton.className = 'buttonToolgrid'
    addKundeButton.type = 'button'
    addKundeButton.onclick = ()=> addKunde()
    addKundeButton.textContent = 'Kunde anlegen'    

    filterBoxKundeDiv.appendChild(kundeH2)
    filterBoxKundeDiv.appendChild(kundeInput)
    filterBoxKundeDiv.appendChild(suchKundeButton)
    filterBoxKundeDiv.appendChild(addKundeButton)

    toolGrid.appendChild(filterBoxKundeDiv)

    const filterBoxZimmerDiv = document.createElement('div')
    filterBoxZimmerDiv.className = 'filterBox'
    filterBoxZimmerDiv.id = 'zimmerFilter'

    const zimmerH2 = document.createElement('h2')
    zimmerH2.className = 'überschriftToolgrid'
    zimmerH2.textContent = 'Zimmer'
    zimmerH2.style.gridRow = '1 / 2'


    const zimmerInput = document.createElement('input')
    zimmerInput.className = 'searchInput'
    zimmerInput.type = 'text'
    zimmerInput.id = 'zimmerSuchInput'
    zimmerInput.placeholder = 'Zimmernummer/Kategorie/...'
    zimmerInput.style.gridRow = '2 / 3'

    const suchZimmerButton = document.createElement('button')
    suchZimmerButton.className = 'suchButton'
    suchZimmerButton.type = 'button'
    suchZimmerButton.onclick = ()=> getZimmer(document.getElementById('zimmerSuchInput').value)
    suchZimmerButton.textContent = 'Suchen'
    suchZimmerButton.style.gridRow = '2 / 3'

    filterBoxZimmerDiv.appendChild(zimmerH2)
    filterBoxZimmerDiv.appendChild(zimmerInput)
    filterBoxZimmerDiv.appendChild(suchZimmerButton)

    toolGrid.appendChild(filterBoxZimmerDiv)

    const filterBoxBuchungDiv = document.createElement('div')
    filterBoxBuchungDiv.className = 'filterBox'
    filterBoxBuchungDiv.id = 'buchungFilter'

    const BuchungH2 = document.createElement('h2')
    BuchungH2.className = 'überschriftToolgrid'
    BuchungH2.textContent = 'Buchung'
    BuchungH2.style.gridRow = '1 / 2'

    const buchungInput = document.createElement('input')
    buchungInput.className = 'searchInput'
    buchungInput.type = 'text'
    buchungInput.id = 'buchungSuchInput'
    buchungInput.placeholder = 'Buchungsnummer/Kundennummer'
    buchungInput.style.gridRow = '2 / 3'

    const suchBuchungButton = document.createElement('button')
    suchBuchungButton.className = 'suchButton'
    suchBuchungButton.type = 'button'
    suchBuchungButton.onclick = ()=> getBuchung(document.getElementById('buchungSuchInput').value)
    suchBuchungButton.textContent = 'Suchen'
    suchBuchungButton.style.gridRow = '2 / 3'

    const addBuchungButton = document.createElement('button')
    addBuchungButton.className = 'buttonToolgrid'
    addBuchungButton.type = 'button'
    addBuchungButton.onclick = ()=> addBuchung()
    addBuchungButton.textContent = 'Buchung anlegen'

    filterBoxBuchungDiv.appendChild(BuchungH2)
    filterBoxBuchungDiv.appendChild(buchungInput)
    filterBoxBuchungDiv.appendChild(suchBuchungButton)
    filterBoxBuchungDiv.appendChild(addBuchungButton)

    toolGrid.appendChild(filterBoxBuchungDiv)

    if(loggedInUser.Role === 'Admin'){
        const filterBoxBewertungDiv = document.createElement('div')
        filterBoxBewertungDiv.className = 'filterBox'
        filterBoxBewertungDiv.id = 'bewertungFilter'

        const BewertungH2 = document.createElement('h2')
        BewertungH2.className = 'überschriftToolgrid'
        BewertungH2.textContent = 'Bewertung'
        BewertungH2.style.gridRow = '1 / 2'

        const suchOffeneBewertungButton = document.createElement('button')
        suchOffeneBewertungButton.className = 'buttonToolgrid'
        suchOffeneBewertungButton.type = 'button'
        suchOffeneBewertungButton.onclick = ()=> getBewertungen('0')
        suchOffeneBewertungButton.textContent = 'Offene Bewertungen'

        const suchAlleBewertungButton = document.createElement('button')
        suchAlleBewertungButton.className = 'buttonToolgrid'
        suchAlleBewertungButton.type = 'button'
        suchAlleBewertungButton.onclick = ()=> getBewertungen('1')
        suchAlleBewertungButton.textContent = 'Freigegebene Bewertungen'

        filterBoxBewertungDiv.appendChild(BewertungH2)
        filterBoxBewertungDiv.appendChild(suchOffeneBewertungButton)
        filterBoxBewertungDiv.appendChild(suchAlleBewertungButton)

        toolGrid.appendChild(filterBoxBewertungDiv)
    }else{
    }
}

// Funktion zum Ausloggen des Nutzers
// - Entfernt die administrativen Kacheln
// - Leert das dataGrid
// - ???
function logout(){
    const toolGrid = document.getElementById('toolGrid')
    let länge = toolGrid.children.length;

    for(let i = 0;i < länge; i ++){
        toolGrid.removeChild(toolGrid.children[0])
    }
    clearDataGrid();
    loggedIn = false;
    firstVisit();
    localStorage.removeItem('token')
    const headerbutton = document.getElementById('headerButton');
    headerbutton.style.display = 'none';
    LoginRequest();
}

// Hilfsfunktion: rechnet ein Date in einen String um
function formatDateForInput(date) {
    const parts = date.split('-');
    let year = parseInt(parts[0], 10); 
    let month = parseInt(parts[1], 10); 
    let day = parseInt(parts[2], 10); 

    if(day/10 < 1){
        day = '0' + day
    }
    if(month/10 < 1){
        month = '0' + month
    }
    return `${year}-${month}-${day}`;
}

// Hilfsfunktion: passt die Größe der Textareas an bei den Bewertungskacheln
function adjustTextareaHeight() {
    const textareas = document.getElementsByClassName('textBewertung')
    for(let i = 0; i < textareas.length; i++){
        textareas[i].style.height = 'auto'; 
        textareas[i].style.height = (textareas[i].scrollHeight + 2) + 'px';
    }
}

// Hilfsfunktion: Entfernt alle Children des HTML-Objekts "dataGrid"
function clearDataGrid(){
    const dataGrid = document.getElementById('dataGrid')
    let children = dataGrid.children.length
    while(children > 0){
        dataGrid.removeChild(dataGrid.children[0])
        children = dataGrid.children.length
    }
}