import { Room } from "./ClassZimmer.js";
import { Customer } from "./ClassKunde.js";

// const ArrayZimmer = [
//     {name: 'HansWurst', kategorie: 'Premium', betten: 'doppelbett', preis: '120€'},
//     {name: 'Elise', kategorie: 'Standard', betten: 'einzelbett', preis: '40€'},
//     {name: 'peter', kategorie: 'Luxus', betten: 'doppelbett', preis: '190€'},
//     {name: 'Wolf', kategorie: 'Standard', betten: 'einzelbett', preis: '60€'}
// ]

let newZimmer
let newKunde
let newBuchungen
let newBewertungen

async function fetchZimmer(suchbegriff){
    const url = "AdminSearch.php?req=Zimmer&search="+encodeURIComponent(suchbegriff);
    await RequestPHPAsync(url, (data)=>{
        const zimmer = JSON.parse(data)
        newZimmer = zimmer
    }, ()=>{})
}

async function fetchKunden(suchbegriff){
    const url = "AdminSearch.php?req=Kunde&search="+encodeURIComponent(suchbegriff);
    await RequestPHPAsync(url, (data)=>{
        const kunde = JSON.parse(data)
        newKunde = kunde
    }, ()=>{})
}

async function fetchBuchungen(suchbegriff){
    const url = "AdminSearch.php?req=Buchung&search="+encodeURIComponent(suchbegriff);
    await RequestPHPAsync(url, (data)=>{
        const buchung = JSON.parse(data)
        newBuchungen = buchung
    }, ()=>{})
}

async function fetchBewertungen(suchbegriff){
    const url = "AdminSearch.php?req=Bewertung&search="+encodeURIComponent(suchbegriff);
    await RequestPHPAsync(url, (data)=>{
        const bewertung = JSON.parse(data)
        newBewertungen = bewertung
    }, ()=>{})
}

const ArrayBewertungen = [
    {
        id: 'kl523',
        kunde: {vorname: "Hans",
                nachname: "Wurst", 
                strHausnummer: "Fleischeralle 9",
                plz: '23487',
                stadt: "Hackstadt",
                geschlecht: "d",
                gebdatum: new Date()},
        text: 'Bartwurstkeksemmeln sind geil, weil sie die perfekte Kombination aus den würzigen, herzhaften Aromen der Bratwurst und der weichen, fluffigen Textur eines frischen Brötchens bieten. Diese Köstlichkeit, die in Deutschland und darüber hinaus beliebt ist, ist nicht nur ein Geschmackserlebnis, sondern auch eine Hommage an die traditionelle deutsche Küche. Ob nun beim Frühstück, Mittagessen oder als Snack, die Bartwurstkeksemmeln sind ein Fest für den Gaumen und vereinen Einfachheit mit Genuss auf eine Weise, die sowohl satt als auch zufrieden macht.', 
        sterne: 3,
        freigegeben: false
    },
    {
        id: 'gt123',
        kunde: {vorname: "Hans",
                nachname: "Wurst", 
                strHausnummer: "Fleischeralle 9",
                plz: '23487',
                stadt: "Hackstadt",
                geschlecht: "d",
                gebdatum: new Date()},
        text: 'naja a bissala arsch wars halt', 
        sterne: 1,
        freigegeben: true
    },
]

// const ArrayKunden = [
//     {
//         id: '00001',
//         vorname: "Hans",
//         nachname: "Wurst", 
//         strHausnummer: "Fleischeralle 9",
//         plz: '23487',
//         stadt: "Hackstadt",
//         geschlecht: "divers",
//         gebdatum: '23.11.1973'
//     },
//     {
//         id: '00002',
//         vorname: "elli",
//         nachname: "Nachname", 
//         strHausnummer: "Blümchenweg 69",
//         plz: '23487',
//         stadt: "Hackstadt",
//         geschlecht: "weiblich",
//         gebdatum: '16.08.1999'
//     },
//     {
//         id: '00003',
//         vorname: "mark",
//         nachname: "dummi", 
//         strHausnummer: "Weg 9",
//         plz: '23487',
//         stadt: "Hackstadt",
//         geschlecht: "weiblich",
//         gebdatum: '06.01.1999'
//     }
// ]

let loggedInUser
let loggedIn = false

const ArrayNutzer = [
    {
        id: '1k2j3',
        vorname: 'joh',
        nachname: 'blub',
        rolle: 'admin'
    },
    {
        id: '5j3l2',
        vorname: 'lyssi',
        nachname: 'blub',
        rolle: 'admin'
    },
    {
        id: '2k3g5',
        vorname: 'jordi',
        nachname: 'blub',
        rolle: 'mitarbeiter'
    },
]

document.addEventListener('DOMContentLoaded', function() {
    if(loggedIn === false){
        firstVisit()
        const popup = document.getElementById('popup')
        popup.style.display = 'block'
        document.getElementById('LoginForm').addEventListener (
            "submit", 
            function (evt) {
                const test = document.getElementById('LoginForm')
                var fd = new FormData(document.getElementById('LoginForm'));
                console.log(fd);
  
                RequestPHP("POST", "AdminLogin.php",
                    (data)=>{
                        if(data==JSON.stringify("login_err_idpass")){
                          alert("Id/Pass False");
                          return;
                        }

                        loggedInUser=JSON.parse(data);

                        console.log('loggedInUser', loggedInUser)
                        closeLogin()
                        loggedIn = true
                    },
                    ()=>{
                    },
                    fd);

                evt.preventDefault();
                }
            )

    }
    
});

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

function closeLogin(){
    const body = document.getElementsByTagName('body')
    body[0].removeChild(document.getElementById('popup'))
    bluidToolgrid()

    const headerbutton = document.getElementById('headerButton')
    headerbutton.style.display = 'flex'
}

async function getKunde(suchbegriff){
    await fetchKunden(suchbegriff).then((value)=>{
        console.log(newKunde)
        clearDataGrid()
        const dataGrid = document.getElementById('dataGrid')

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        ['Kundennummer', 'Name', 'Geburtsdatum', ''].forEach((headerText) => {
            const th = document.createElement('th');
            th.textContent = headerText;
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        newKunde.forEach(kunde => {
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
            // button.setAttribute('onclick', `changeKundenProfil('${kunde.id}')`)
            button.onclick = ()=> changeKundenProfil(kunde.Id)
            row.appendChild(button)

            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        
        dataGrid.appendChild(table);
    })
    
}

function changeKundenProfil(idKunde){
    console.log(idKunde)
    clearDataGrid()
    let zuändernderKunde = newKunde.filter(kunde => kunde.Id === idKunde)
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
    // birthDateLabel.for = ()=> birthDate
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
        console.log('veränderter kunde', newKunde)
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

function addKunde(){
    clearDataGrid()
    const dataGrid = document.getElementById('dataGrid')

    const form = document.createElement('form');
    form.id = 'profileForm';

    const fields = [
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

        var sx = this[5].value == "weiblich"?"F":this[5].value == "männlich" ? "M" : "D";
        const newKunde = {
            Id: -1,
            FirstName: this[0].value,
            LastName: this[1].value,
            Address: this[2].value,
            PLZ: this[3].value,
            City: this[4].value,
            Sex: sx,
            Birthdate: this[6].value,
            Code:"A",
            usr:"newthingy",
            pw:"password1234"
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

async function getZimmer(suchbegriff){
    await fetchZimmer(suchbegriff).then((value)=>{
        clearDataGrid()
        const dataGrid = document.getElementById('dataGrid')

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        // Objekt, das den Sortierungszustand für jede Spalte speichert
        const sortStates = {};

        ['Name', 'Betten', 'Kategorie', 'Preis', 'Bildpfad'].forEach((headerText, index) => {
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
        newZimmer.forEach(rowData => {
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
                    return newZimmer.indexOf(JSON.parse(JSON.stringify(Object.assign({}, {name: aCol, kategorie: b.getElementsByTagName('td')[1].textContent, betten: b.getElementsByTagName('td')[2].textContent, preis: b.getElementsByTagName('td')[3].textContent})))) - 
                    newZimmer.indexOf(JSON.parse(JSON.stringify(Object.assign({}, {name: bCol, kategorie: a.getElementsByTagName('td')[1].textContent, betten: a.getElementsByTagName('td')[2].textContent, preis: a.getElementsByTagName('td')[3].textContent})))) 
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

async function getBuchung(suchbegriff){
    await fetchBuchungen(suchbegriff).then((value)=>{
        console.log(newBuchungen)
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
        newBuchungen.forEach(rowData => {
            const row = document.createElement('tr');

            const cellId = document.createElement('td')
            cellId.textContent = rowData.id;
            row.appendChild(cellId);

            const cellKunde = document.createElement('td')
            cellKunde.textContent = rowData.kunde.nachname + ', ' + rowData.kunde.vorname;
            row.appendChild(cellKunde);

            const cellZimmer = document.createElement('td')
            cellZimmer.textContent = rowData.zimmer.kategorie + ': ' + rowData.zimmer.name;
            row.appendChild(cellZimmer);

            const cellPreis = document.createElement('td')
            let preis = rowData.buchungszeitraum * parseInt(rowData.zimmer.preis.replace('€', ''))
            cellPreis.textContent = preis
            row.appendChild(cellPreis);

            const cellAnreise = document.createElement('td')
            let date = rowData.anreise.getDate().toString().padStart(2, '0') + '.' + (rowData.anreise.getMonth() + 1).toString().padStart(2, '0') + '.' + rowData.anreise.getFullYear()
            cellAnreise.textContent = date
            row.appendChild(cellAnreise);

            const cellAbreise = document.createElement('td')
            date = rowData.abreise.getDate().toString().padStart(2, '0') + '.' + (rowData.abreise.getMonth() + 1).toString().padStart(2, '0') + '.' + rowData.abreise.getFullYear()
            cellAbreise.textContent = date
            row.appendChild(cellAbreise);

            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        // Füge die Tabelle zum Body hinzu
        dataGrid.appendChild(table);
    })
        

}

function addBuchung(){
    clearDataGrid()
    const dataGrid = document.getElementById('dataGrid')

    const form = document.createElement('form');
    form.id = 'buchungForm';

    const fields = [
        { label: 'Kunde Vorname:', id: 'firstName', type: 'text'},
        { label: 'Kunde Nachname:', id: 'lastName', type: 'text'}
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
        input.required = true;
        if (field.pattern) input.pattern = field.pattern;
        form.appendChild(input);
    });

    // Geschlecht
    const zimmerLabel = document.createElement('label');
    zimmerLabel.setAttribute('for', 'zimmer');
    zimmerLabel.textContent = 'Zimmer:';
    form.appendChild(zimmerLabel);

    const zimmerSelect = document.createElement('select');
    zimmerSelect.id = 'zimmer';
    zimmerSelect.name = 'zimmer';
    zimmerSelect.required = true;
   
    newZimmer.forEach(zimmer =>{
        const optionZimmer = document.createElement('option');
        optionZimmer.value = zimmer.name;
        optionZimmer.textContent = zimmer.kategorie + ': ' + zimmer.name;
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

        //Hier die Speicherfunktion zur Datenbank

        alert('Buchung erfolgreich angelegt!');
        clearDataGrid()
    });

    dataGrid.appendChild(form);
}

async function getBewertungen(offene){
    console.log(offene)
    await fetchBewertungen(offene).then((value)=>{
        console.log(newBewertungen)
        clearDataGrid()
        const dataGrid = document.getElementById('dataGrid')

        newBewertungen.forEach(bewertung => {
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
            if(bewertung.Status === "0"){
                checkbox.checked = false
            }else{
                checkbox.checked = true
            }
            const checkboxLabel = document.createElement('label');
            checkboxLabel.id = bewertung.id;
            checkboxLabel.textContent = 'Freigeben';
            checkboxLabel.className = 'checkboxSpan';
            checkboxLabel.setAttribute('onclick', 'releaseBewertung(event)')

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

function adjustTextareaHeight() {
    const textareas = document.getElementsByClassName('textBewertung')
    for(let i = 0; i < textareas.length; i++){
        textareas[i].style.height = 'auto'; 
        textareas[i].style.height = (textareas[i].scrollHeight + 2) + 'px';
    }
}

function releaseBewertung(event){
    let idBewertung = event.target.id
    let checkbox = event.target.previousSibling
    checkbox.checked = !checkbox.checked

    //Hier einfügen, dass die Freigabe geändert wurde, sodass es auf der frontpage angezeigt wird
    //changeFreigabestatus(idBewertung, checkbox.checked)
    
}

function clearDataGrid(){
    const dataGrid = document.getElementById('dataGrid')
    let children = dataGrid.children.length
    while(children > 0){
        dataGrid.removeChild(dataGrid.children[0])
        children = dataGrid.children.length
    }
}

function bluidToolgrid(){
    const toolGrid = document.getElementById('toolGrid') 
    // console.log()
    if(loggedInUser.Role === 'Admin'){
        toolGrid.style.gridTemplateColumns = '1fr 1fr 1fr 1fr'
    }else{
        toolGrid.style.gridTemplateColumns = '1fr 1fr 1fr'
    }


    const filterBoxKundeDiv = document.createElement('div')
    filterBoxKundeDiv.className = 'filterBox'
    filterBoxKundeDiv.id = 'kundeFilter'

    const kundeH2 = document.createElement('h2')
    kundeH2.textContent = 'Kunde'

    const kundeInput = document.createElement('input')
    kundeInput.type = 'text'
    kundeInput.id = 'kundeSuchInput'
    kundeInput.placeholder = 'Nachnahme/Kundennummer'

    const suchKundeButton = document.createElement('button')
    suchKundeButton.type = 'button'
    suchKundeButton.onclick = ()=> getKunde(document.getElementById('kundeSuchInput').value)
    suchKundeButton.textContent = 'Suchen'

    const addKundeButton = document.createElement('button')
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
    zimmerH2.textContent = 'Zimmer'

    const zimmerInput = document.createElement('input')
    zimmerInput.type = 'text'
    zimmerInput.id = 'zimmerSuchInput'
    zimmerInput.placeholder = 'Zimmernummer/Kategorie/...'

    const suchZimmerButton = document.createElement('button')
    suchZimmerButton.type = 'button'
    suchZimmerButton.onclick = ()=> getZimmer(document.getElementById('zimmerSuchInput').value)
    suchZimmerButton.textContent = 'Suchen'

    filterBoxZimmerDiv.appendChild(zimmerH2)
    filterBoxZimmerDiv.appendChild(zimmerInput)
    filterBoxZimmerDiv.appendChild(suchZimmerButton)

    toolGrid.appendChild(filterBoxZimmerDiv)

    const filterBoxBuchungDiv = document.createElement('div')
    filterBoxBuchungDiv.className = 'filterBox'
    filterBoxBuchungDiv.id = 'buchungFilter'

    const BuchungH2 = document.createElement('h2')
    BuchungH2.textContent = 'Buchung'

    const buchungInput = document.createElement('input')
    buchungInput.type = 'text'
    buchungInput.id = 'buchungSuchInput'
    buchungInput.placeholder = 'Buchungsnummer/Kundennummer'

    const suchBuchungButton = document.createElement('button')
    suchBuchungButton.type = 'button'
    suchBuchungButton.onclick = ()=> getBuchung(document.getElementById('buchungSuchInput').value)
    suchBuchungButton.textContent = 'Suchen'

    const addBuchungButton = document.createElement('button')
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
        BewertungH2.textContent = 'Bewertung'

        const suchOffeneBewertungButton = document.createElement('button')
        suchOffeneBewertungButton.type = 'button'
        suchOffeneBewertungButton.onclick = ()=> getBewertungen('0')
        suchOffeneBewertungButton.textContent = 'Offene Bewertungen'

        const suchAlleBewertungButton = document.createElement('button')
        suchAlleBewertungButton.type = 'button'
        suchAlleBewertungButton.onclick = ()=> getBewertungen('-1')
        suchAlleBewertungButton.textContent = 'Alle Bewertungen'

        filterBoxBewertungDiv.appendChild(BewertungH2)
        filterBoxBewertungDiv.appendChild(suchOffeneBewertungButton)
        filterBoxBewertungDiv.appendChild(suchAlleBewertungButton)

        toolGrid.appendChild(filterBoxBewertungDiv)
    }else{
    }

}

function logout(){
    const toolGrid = document.getElementById('toolGrid')
    let länge = toolGrid.children.length

    for(let i = 0;i < länge; i ++){
        toolGrid.removeChild(toolGrid.children[0])
    }
    clearDataGrid()
    loggedIn = false
    firstVisit()
    const headerbutton = document.getElementById('headerButton')
    headerbutton.style.display = 'none'
    const popup = document.getElementById('popup')
        popup.style.display = 'block'
        document.getElementById('LoginForm').addEventListener (
            "submit", 
            function (evt) {
                for(let i = 0; i < ArrayNutzer.length; i++){
                    if(evt.target[0].value === ArrayNutzer[i].vorname && evt.target[1].value === ArrayNutzer[i].nachname){
                        loggedInUser = ArrayNutzer[i]
                        closeLogin()
                        loggedIn = true
                        break
                    }
                    evt.preventDefault();
                }
        })
}
