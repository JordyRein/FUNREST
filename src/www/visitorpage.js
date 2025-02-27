
let LoggedInUser
let firstLoad = false
let newArrayZimmer
let newArrayBuchungenKunde
let newArrayBewertungenKunde

function closeLogin() {
    const body = document.getElementsByTagName('body');
    const loginForm = document.getElementById('popup');
    body[0].removeChild(loginForm)

    if(LoggedInUser != undefined){
        userProfileMin()
    }
}

function userProfileMin(){
    const buttonsHeader = document.getElementById('buttonsHeader')
    buttonsHeader.removeChild(document.getElementById('headerButton'))
    buttonsHeader.style.display = 'block'

    const name = document.createElement('h4')
    console.log('firstname?', LoggedInUser.FirstName)
    name.innerText = LoggedInUser.FirstName
    name.style.padding = '5px'
    name.style.justifySelf = 'center'
    name.style.height = '50px'

    const profile = document.createElement('button')
    profile.innerText = 'Einstellungen'
    profile.style.margin = 'auto 0px auto auto'
    profile.style.width = '100%'
    profile.setAttribute('onclick', 'openProfile()');

    const logoutButton = document.createElement('button')
    logoutButton.innerText = 'Ausloggen'
    logoutButton.style.margin = 'auto 0px auto auto'
    logoutButton.style.width = '100%'
    logoutButton.setAttribute('onclick', 'logoutUser()');

    buttonsHeader.appendChild(name)
    buttonsHeader.appendChild(profile)
    buttonsHeader.appendChild(logoutButton)
}

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
    // headerButtons.style.justifyContent = 'center'
    firstVisit()
}

function openProfile(){
    const container = document.getElementById('contentSpace')
    emptyContainer(container)
    createProfileFitlerMenü()
    loadData()
}

document.addEventListener('DOMContentLoaded', function() {
    if(firstLoad === false){
        firstVisit()
        createZimmerFilterMenü()
        firstLoad = true
    }
    // document.getElementById('headerButton').addEventListener('click', function() {
        
        // document.getElementById('popup').style.display = 'block';
        // document.getElementById('LoginForm').addEventListener (
        //     "submit", 
        //     function (evt) {
        //         var fd = new FormData(document.getElementById('LoginForm'));
        //         RequestPHP("POST", "KundeLogin.php",
        //             (data)=>{
        //                 if(data==JSON.stringify("login_err_idpass")){
        //                   alert("Id/Pass False");
        //                   return;
        //                 }
        //                 LoggedInUser=JSON.parse(data);

        //                 console.log('loggedInUser', LoggedInUser)
        //                 closeLogin()
        //                 // userProfileMin()
        //                 // loggedIn = true
        //             },
        //             ()=>{
        //             },
        //             fd);

        //         evt.preventDefault();
        //         }
        // )
    // });
});

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
    cancelButton.type = 'button'
    cancelButton.textContent = 'X'
    cancelButton.onclick = ()=>closeLogin()
    loginDiv.appendChild(cancelButton)

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

function createRegistrierPopup(){
    const header = document.getElementsByTagName('header')

    const body = document.getElementsByTagName('body');
    const loginForm = document.getElementById('popup');
    body[0].removeChild(loginForm)

    const registerContainerDiv = document.createElement('div')
    registerContainerDiv.id = 'popup'
    registerContainerDiv.className = 'popup'
    registerContainerDiv.style.display = 'flex'
    registerContainerDiv.style.height = '750px'

    const registerContentDiv = document.createElement('div')
    registerContentDiv.className = 'popup-content'

    const cancelButton = document.createElement('button')
    cancelButton.type = 'button'
    cancelButton.textContent = 'X'
    cancelButton.onclick = ()=>closeLogin()
    registerContentDiv.appendChild(cancelButton)

    // Formular
    const form = document.createElement('form');
    form.id = 'profileForm';

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
        debugger
        const username = this[0].value
        const password = this[1].value
        const vorname = this[2].value
        const nachname = this[3].value
        const strHausnummer = this[4].value
        const plz = this[5].value
        const stadt = this[6].value
        const geschlecht = this[7].value
        const gebdatum = this[8].value

        //Hier die Speicherfunktion zur Datenbank

        alert('Profil erfolgreich aktualisiert!');
    });

    registerContentDiv.appendChild(form)

    registerContainerDiv.appendChild(registerContentDiv)

    header[0].insertAdjacentElement("afterend",registerContainerDiv)
}

function login(){
    document.getElementById('popup').style.display = 'block';
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
                    // userProfileMin()
                    // loggedIn = true
                },
                ()=>{
                },
                fd);

            evt.preventDefault();
            }
    )
}

function addKunde(){

}

async function firstVisit(){
    // Array von allen Zimmer des Hotels ohne Filter
    const url = "AdminSearch.php?req=Zimmer&search="+encodeURIComponent('');
    await RequestPHPAsync(url, (data)=>{
        const zimmer = JSON.parse(data)
        newArrayZimmer = zimmer
        createZimmerElement()
    }, ()=>{})
}

async function getAllZimmer(){
    const url = "AdminSearch.php?req=Zimmer&search="+encodeURIComponent('');
    await RequestPHPAsync(url, (data)=>{
        const zimmer = JSON.parse(data)
        newArrayZimmer = zimmer
    }, ()=>{})
}

async function loadData(){
    const urlBuch = "KundeSearch.php?req=Buchung&kunde="+encodeURIComponent(LoggedInUser.Id);
    console.log('urlBuchung', urlBuch)
    await RequestPHPAsync(urlBuch, (data)=>{
        const buchung = JSON.parse(data)
        newArrayBuchungenKunde = buchung
    }, ()=>{})

    const urlBewe = "KundeSearch.php?req=Bewertung&kunde="+encodeURIComponent(LoggedInUser.Id);
    await RequestPHPAsync(urlBewe, (data)=>{
        const bewertung = JSON.parse(data)
        newArrayBewertungenKunde = bewertung
    }, ()=>{})
}

// Funktion zum Erstellen des Zimmer-Elements
function createZimmerElement() {

    const content = document.getElementById('contentSpace')

    const zimmerListe = document.createElement('div')
    zimmerListe.id = 'zimmerListe'

    //das ganze was grad druntersteht in die forschleife reinkopieren, sobald man ein Array mit den gefilterten Zimmern aus SQL hat
    newArrayZimmer.forEach(zimmer =>{

        // console.log(zimmer)

        const zimmerDiv = document.createElement('div');
        zimmerDiv.className = 'zimmerGrid';
    
        const zimmerInfoGrid = document.createElement('div');
        zimmerInfoGrid.className = 'zimmerInfoGrid';
    
        const zimmerHeader = document.createElement('div');
        zimmerHeader.className = 'zimmerHeader';
    
        const zimmerÜberschrift1 = document.createElement('p');
        zimmerÜberschrift1.className = 'zimmerÜberschrift';
        zimmerÜberschrift1.innerText = zimmer.Kategorie + ' Zimmer:';
    
        const zimmerÜberschrift2 = document.createElement('p');
        zimmerÜberschrift2.className = 'zimmerÜberschrift';
        zimmerÜberschrift2.innerText = zimmer.Name
    
        zimmerHeader.appendChild(zimmerÜberschrift1);
        zimmerHeader.appendChild(zimmerÜberschrift2);
    
        const detailedInfoGrid = document.createElement('div');
        detailedInfoGrid.className = 'detailedInfoGrid';
    
        const buchenButton = document.createElement('button');
        buchenButton.id = zimmer.Name ;
        buchenButton.className = 'buttonBuchung';
        buchenButton.innerText = 'Zimmer jetzt buchen!!';
    
        const preisWoche = zimmer.Preis * 6
        const preisTable = document.createElement('table');
        preisTable.innerHTML = `
            <tr><th>Preis:</th></tr>
            <tr><td>`+ zimmer.Preis +`€/Nacht</td></tr>
            <tr><td>`+ preisWoche +`€/Woche</td></tr>
        `;
    
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
    
        const ausstattungTable = document.createElement('table');
        ausstattungTable.innerHTML = `
            <tr><th>Ausstattung</th></tr>
            <tr><td>`+ Fernseher +`</td><td>`+ Küche +`</td><td>`+ Wohnzimmer +`</td></tr>
            <tr><td>`+ Außenbereich+`</td><td>`+ Bad +`</td><td>`+ Extra +`</td></tr>
        `;
    
        detailedInfoGrid.appendChild(buchenButton);
        detailedInfoGrid.appendChild(preisTable);
        detailedInfoGrid.appendChild(ausstattungTable);
    
        zimmerInfoGrid.appendChild(zimmerHeader);
        zimmerInfoGrid.appendChild(detailedInfoGrid);
    
        const zimmerBild = document.createElement('div');
        zimmerBild.className = 'zimmerBild';
    
        const img = document.createElement('img');
        img.className = 'genericZimmerBilder';
        img.src = zimmer.Bild
        img.alt = 'Hotelzimmer';
        img.height = 130;
    
        zimmerBild.appendChild(img);
        zimmerDiv.appendChild(zimmerInfoGrid);
        zimmerDiv.appendChild(zimmerBild);
        zimmerListe.appendChild(zimmerDiv);

    })

    content.appendChild(zimmerListe)
}

// Funktion zum Erstellen der Profilseite
function createProfileForm() {

    const container = document.getElementById('contentSpace')
    emptyContainer(container)

    const profilContainer = document.createElement('div');
    profilContainer.id = 'profilContainer';
    profilContainer.width = '95%'
    profilContainer.style.backgroundColor = 'lightgray'

    const h1 = document.createElement('h1');
    h1.textContent = 'Profil';
    profilContainer.appendChild(h1);

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

        alert('Profil erfolgreich aktualisiert!');
    });

    profilContainer.appendChild(form);

    container.appendChild(profilContainer)
}

function createBewertungForm(){
    const container = document.getElementById('contentSpace')
    emptyContainer(container)

    newArrayBuchungenKunde.forEach(buchung => {
        if(new Date(buchung.Abreise) < new Date()){
            console.log('üder die dates ansich')
        }
            const blub = new Date(buchung.Abreise)
            const blab = new Date()
        if(blub < blab){
            console.log('üder die variablen')
        }

        if(buchung.BewertungsId === null && new Date(buchung.Abreise) < new Date()){
            const bewertungsDiv = document.createElement('div')
            bewertungsDiv.className = 'bewertungContainer'
            bewertungsDiv.style.width = '90%'
            bewertungsDiv.style.backgroundColor = 'beige'
            bewertungsDiv.style.margin = '10px'
            bewertungsDiv.style.padding = '5px'
    
            const ersteReihe = document.createElement('div');
            ersteReihe.className = 'ersteReihe';
    
            const buchungsInfoSpan = document.createElement('span');
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
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const sterne = this[0].value
                const titel = this[1].value
                const text = this[2].value
                const bId = buchung.BuchungId
                
    
                const review = {id: LoggedInUser.Id, rating: sterne, titel: titel, text: text, bId: bId}
                console.log(review)
                RequestPHP('POST', 'KundePost.php', (data)=>{
                    if (JSON.parse(data)=="ok"){
                        alert('Bewertung erfolgreich angelegt!');
                    }
                }, (error)=>{
                    console.log('rückgabe mit error',error)
                }, JSON.stringify(review))
        
                emptyContainer(container)
            });
    
            bewertungsDiv.appendChild(ersteReihe);
            bewertungsDiv.appendChild(zweiteReihe);
    
            container.appendChild(bewertungsDiv)
        }
    })    
}

function backToSearch(){
    const content = document.getElementById('contentSpace')
    content.removeChild(document.getElementById('profilContainer'))
    createZimmerElement()
    // toggleFilterVisibility()
}

function createZimmerFilterMenü(){
    const container = document.getElementById('filterGrid')

    emptyContainer(container)

    // Datumsauswahl
    const datumsauswahlDiv = document.createElement('div');
    datumsauswahlDiv.className = 'datumsauswahl';

    const auswahlText = document.createElement('p');
    auswahlText.textContent = 'Reisezeitraum auswählen:';
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
    const kategorieLabel = document.createElement('label');
    kategorieLabel.setAttribute('for', 'kategorie');
    kategorieLabel.textContent = 'Kategorieauswahl:';
    container.appendChild(kategorieLabel);

    const kategorieSelect = document.createElement('select');
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

    container.appendChild(kategorieSelect);

    // Dropdown für Bettenauswahl
    const bettenLabel = document.createElement('label');
    bettenLabel.setAttribute('for', 'betten');
    bettenLabel.textContent = 'Bettenauswahl:';
    container.appendChild(bettenLabel);

    const bettenSelect = document.createElement('select');
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

    container.appendChild(bettenSelect);

    const saveFilterButton = document.createElement('button')
    saveFilterButton.type = 'button'
    saveFilterButton.onclick = ()=> selectFilter()
    saveFilterButton.textContent = 'Fitler anwenden'

    container.appendChild(saveFilterButton)

}

function selectFilter(){
    const dateStart = document.getElementById('dateStart')
    const dateEnd = document.getElementById('dateEnd')
    const kategorie = document.getElementById('kategorie')
    const typ = document.getElementById('betten')
    console.log(dateStart.value, dateEnd.value, kategorie.value, typ.value)

    updateZimmerArray(dateStart.value, dateEnd.value, kategorie.value, typ.value)
}

async function updateZimmerArray(dateStart, dateEnd, Kategorie, Typ){
    const container = document.getElementById('zimmerListe')
    emptyContainer(container)
    const url = "KundeSearch.php?req=Zimmer&start="+encodeURIComponent(dateStart)+"&end="+encodeURIComponent(dateEnd)+"&kategorie="+encodeURIComponent(Kategorie)+"&typ="+encodeURIComponent(Typ);
    await RequestPHPAsync(url, (data)=>{
        debugger
        const zimmer = JSON.parse(data)
        newArrayZimmer = zimmer
        createZimmerElement()
    }, ()=>{})
}

function createProfileFitlerMenü(){
    const container = document.getElementById('filterGrid')

    emptyContainer(container)

    const backButton = document.createElement('button')
    backButton.type = 'button'
    backButton.textContent = 'zurück zu den Zimmern'
    backButton.setAttribute('onclick', 'backToSearch()')

    container.appendChild(backButton)

    const buttonProfile = document. createElement('button')
    buttonProfile.textContent = 'Profil bearbeiten'
    buttonProfile.setAttribute('onclick', 'createProfileForm()')

    container.appendChild(buttonProfile)

    const buttonBewertung = document. createElement('button')
    buttonBewertung.textContent = 'Bewertung zu Buchung abgeben'
    buttonBewertung.setAttribute('onclick', 'createBewertungForm()')

    container.appendChild(buttonBewertung)
}

function emptyContainer(container){
    let länge = container.children.length
    for(let i = 0; i < länge; i++){
        container.removeChild(container.children[0])
    }
}