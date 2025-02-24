import { Customer } from "./ClassKunde"

let LoggedInUser
let firstLoad = false
// let LoggedInUser = {
//     vorname: "",
//     nachname: "", 
//     strHausnummer: "",
//     plz: 12345,
//     stadt: "",
//     geschlecht: "",
//     gebdatum: new Date()
// }

const ArrayZimmer = [
    {id: '1k2j3', name: 'HansWurst', kategorie: 'Premium', betten: 'doppelbett', bild: 'zimmerbild.png', preis: '120'},
    {id: '3j2g3', name: 'Elise', kategorie: 'Standard', betten: 'einzelbett', bild: 'zimmerbild.png', preis: '40'},
    {id: '8j2k1', name: 'peter', kategorie: 'Luxus', betten: 'doppelbett', bild: 'zimmerbild.png', preis: '190'},
    {id: '9d6j3', name: 'Wolf', kategorie: 'Standard', betten: 'einzelbett', bild: 'zimmerbild.png', preis: '60'}
]

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

const ArrayBuchungen = [
    {
        id: '1',
        kunde: {vorname: "Hans",
                nachname: "Wurst", 
                strHausnummer: "Fleischeralle 9",
                plz: '23487',
                stadt: "Hackstadt",
                geschlecht: "d",
                gebdatum: new Date()},
        zimmer: ArrayZimmer[3], 
        buchungszeitraum: 3,
        anreise: new Date(), 
        abreise: new Date(),
        bewertung: false 
    },
    {
        id: '2',
        kunde: {vorname: "Hans",
                nachname: "Wurst", 
                strHausnummer: "Fleischeralle 9",
                plz: '23487',
                stadt: "Hackstadt",
                geschlecht: "d",
                gebdatum: new Date()},
        zimmer: ArrayZimmer[2], 
        buchungszeitraum: 7,
        anreise: new Date(), 
        abreise: new Date(),
        bewertung: false 
    },
    {
        id: '3',
        kunde: {vorname: "elli",
                nachname: "Nachname", 
                strHausnummer: "Blümchenweg 69",
                plz: '23487',
                stadt: "Hackstadt",
                geschlecht: "weiblich",
                gebdatum: new Date()},
        zimmer: ArrayZimmer[1], 
        buchungszeitraum: 1,
        anreise: new Date(), 
        abreise: new Date(),
        bewertung: false  
    }
]

function closeForm() {
    const loginForm = document.getElementById('popup');
    loginForm.style.display = 'none';
}

function selectCategorie(option) {
    document.getElementById('raumauswahl').innerText = option;
}

function selectBetten(option) {
    document.getElementById('bettauswahl').innerText = option;
}

function userProfileMin(){
    const buttonsHeader = document.getElementById('buttonsHeader')
    buttonsHeader.removeChild(document.getElementById('headerButton'))
    buttonsHeader.style.background = 'pink'
    buttonsHeader.style.border = '2px solid darkgray'
    buttonsHeader.style.borderRadius = '10px'
    buttonsHeader.style.margin = '10px'

    const name = document.createElement('h4')
    name.innerText = LoggedInUser.vorname
    name.style.padding = '5px'
    name.style.justifySelf = 'center'
    name.style.height = '50px'

    const profile = document.createElement('button')
    profile.innerText = 'view Profile'
    profile.style.margin = 'auto 0px auto auto'
    profile.style.width = '100%'
    profile.setAttribute('onclick', 'openProfile()');

    buttonsHeader.appendChild(name)
    buttonsHeader.appendChild(profile)
}

function openProfile(){
    const container = document.getElementById('contentSpace')
    emptyContainer(container)
    createProfileFitlerMenü()
}

document.addEventListener('DOMContentLoaded', function() {
    if(firstLoad === false){
        createZimmerElement()
        createZimmerFilterMenü()
        firstLoad = true
    }
    document.getElementById('headerButton').addEventListener('click', function() {
        
        document.getElementById('popup').style.display = 'block';
        document.getElementById('LoginForm').addEventListener (
            "submit", 
            function (evt) {

                const infoLogin = {name: evt.target[0].value, password: evt.target[1].value}
                RequestPHP('POST', 'Login.php', (res)=>{if(res != null){
                    LoggedInUser = res
                    closeForm()
                    userProfileMin()
                }}, ()=>{}, infoLogin)

                evt.preventDefault();
        })
    });
});

function openReg(event){
    let blub = event.currentTarget.parentElement.parentElement
    blub.getElementById('divLogin')
}

// Funktion zum Erstellen des Zimmer-Elements
function createZimmerElement() {

    const content = document.getElementById('contentSpace')

    const zimmerListe = document.createElement('div')
    zimmerListe.id = 'zimmerListe'

    //das ganze was grad druntersteht in die forschleife reinkopieren, sobald man ein Array mit den gefilterten Zimmern aus SQL hat
    ArrayZimmer.forEach(zimmer =>{

        const zimmerDiv = document.createElement('div');
        zimmerDiv.className = 'zimmerGrid';
    
        const zimmerInfoGrid = document.createElement('div');
        zimmerInfoGrid.className = 'zimmerInfoGrid';
    
        const zimmerHeader = document.createElement('div');
        zimmerHeader.className = 'zimmerHeader';
    
        const zimmerÜberschrift1 = document.createElement('p');
        zimmerÜberschrift1.className = 'zimmerÜberschrift';
        zimmerÜberschrift1.innerText = zimmer.kategorie + ' Zimmer:';
    
        const zimmerÜberschrift2 = document.createElement('p');
        zimmerÜberschrift2.className = 'zimmerÜberschrift';
        zimmerÜberschrift2.innerText = zimmer.name
    
        zimmerHeader.appendChild(zimmerÜberschrift1);
        zimmerHeader.appendChild(zimmerÜberschrift2);
    
        const detailedInfoGrid = document.createElement('div');
        detailedInfoGrid.className = 'detailedInfoGrid';
    
        const buchenButton = document.createElement('button');
        buchenButton.id = zimmer.id ;
        buchenButton.className = 'buttonBuchung';
        buchenButton.innerText = 'Zimmer jetzt buchen!!';
    
        const preisWoche = zimmer.preis * 6
        const preisTable = document.createElement('table');
        preisTable.innerHTML = `
            <tr><th>Preis:</th></tr>
            <tr><td>`+ zimmer.preis +`€/Nacht</td></tr>
            <tr><td>`+ preisWoche +`€/Woche</td></tr>
        `;
    
        let Fernseher = ''
        let Küche = ''
        let Wohnzimmer = ''
        let Außenbereich = ''
        let Bad = ''
        let Extra = ''
        switch (zimmer.kategorie) {
            case "Standard":
                Fernseher = '20-Zoll Fernseher'
                Küche = 'Toaster'
                Wohnzimmer = 'Schlafcouch'
                Außenbereich = 'Balkon'
                Bad = 'Duschwanne'
                Extra = ' '
                break;
            case "Deluxe":
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
        img.src = zimmer.bild
        img.alt = 'Hotelzimmer';
        img.height = 130;
    
        zimmerBild.appendChild(img);
        zimmerDiv.appendChild(zimmerInfoGrid);
        zimmerDiv.appendChild(zimmerBild);
        zimmerListe.appendChild(zimmerDiv);

    })

    content.appendChild(zimmerListe)

    // return zimmerListe
}

// Funktion zum Erstellen der Profilseite
function createProfileForm() {

    const container = document.getElementById('contentSpace')
    emptyContainer(container)

    const profilContainer = document.createElement('div');
    profilContainer.id = 'profilContainer';
    profilContainer.width = '100%'

    const h1 = document.createElement('h1');
    h1.textContent = 'Profil';
    profilContainer.appendChild(h1);

    // Formular
    const form = document.createElement('form');
    form.id = 'profileForm';

    const fields = [
        { label: 'Vorname:', id: 'firstName', type: 'text', value: LoggedInUser.vorname },
        { label: 'Nachname:', id: 'lastName', type: 'text', value: LoggedInUser.nachname },
        { label: 'Straße & Hausnummer:', id: 'street', type: 'text', value: LoggedInUser.strHausnummer },
        { label: 'PLZ:', id: 'zipCode', type: 'text', pattern: '[0-9]*', value: LoggedInUser.plz },
        { label: 'Stadt:', id: 'city', type: 'text', value: LoggedInUser.stadt }
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
   
    switch (LoggedInUser.geschlecht) {
        case "männlich":
            optionElementM.defaultSelected = true
            break;
        case "weiblich":
            optionElementW.defaultSelected = true
            break;
        case "divers":
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
    birthDateInput.value = LoggedInUser.gebdatum;
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

    const backButton = document.createElement('button')
    backButton.type = 'button'
    backButton.textContent = 'zurück zu den Zimmern'
    backButton.setAttribute('onclick', 'backToSearch()')

    form.appendChild(backButton)
    profilContainer.appendChild(form);

    container.appendChild(profilContainer)
}

function createBewertungForm(){
    const container = document.getElementById('contentSpace')
    emptyContainer(container)

    // getBuchungen(loggedInUser.id)
    let buchungOhneBewertung = ArrayBuchungen.filter(buchung => buchung.bewertung === false)

    // const dataGrid = document.getElementById('dataGrid')
    

    buchungOhneBewertung.forEach(buchung => {

        const bewertungsDiv = document.createElement('div')
        bewertungsDiv.className = 'bewertungContainer'
        bewertungsDiv.style.width = '90%'

        const ersteReihe = document.createElement('div');
        ersteReihe.className = 'ersteReihe';

        const buchungsInfoSpan = document.createElement('span');
        buchungsInfoSpan.textContent = 'BuchungsNummer: ' + buchung.id + '    Aufenthaltszeitraum: '+ buchung.anreise + ' - ' + buchung.abreise + '    ' + buchung.zimmer.kategorie + ': ' + buchung.zimmer.name
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
        // titleInput.id = ;
        titleInput.name = buchung.id + '-title';
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
        textInput.name = buchung.id + '-text';
        textInput.required = true;

        textDiv.appendChild(textInput);
        form.appendChild(textDiv);

        zweiteReihe.appendChild(form);

        // const speicherButton = document.createElement('button')
        // speicherButton.setAttribute('onclick', 'saveBewertung()')
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Speichern';
        form.appendChild(submitButton);
        form.addEventListener('submit', function(event) {
            event.preventDefault();
    
            console.log(this)
            debugger
            const sterne = this[0].value
            const titel = this[1].value
            const text = this[2].value

            const bewertung =  new Review(-1, LoggedInUser.id, text, titel, sterne, 0)
    
            //Hier die Speicherfunktion zur Datenbank
            RequestPHP('POST', 'Review.php', ()=>{}, ()=>{}, bewertung)
    
            alert('Profil erfolgreich angelegt!');
            clearDataGrid()
        });

        bewertungsDiv.appendChild(ersteReihe);
        bewertungsDiv.appendChild(zweiteReihe);

        container.appendChild(bewertungsDiv)
    })    
}

function toggleFilterVisibility(){
    // const filterbar = document.getElementById('filterGrid')

    // if(filterbar.style.visibility === 'visible'){
    //     filterbar.style.visibility = 'collapse'
    // }else{
    //     filterbar.style.visibility = 'visible'
    // }
}

function backToSearch(){
    const content = document.getElementById('content')
    content.removeChild(document.getElementById('profilContainer'))
    createZimmerElement()
    toggleFilterVisibility()
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

    const submitInput = document.createElement('input');
    submitInput.type = 'submit';
    submitInput.value = 'Absenden';
    datumsauswahlDiv.appendChild(submitInput);

    container.appendChild(datumsauswahlDiv);

    // Dropdown für Kategorieauswahl
    const kategorieDropdown = document.createElement('div');
    kategorieDropdown.className = 'dropdown';

    const kategorieText = document.createElement('p');
    kategorieText.textContent = 'Kategorieauswahl treffen:';
    kategorieDropdown.appendChild(kategorieText);

    const kategorieButton = document.createElement('button');
    kategorieButton.className = 'dropbtn';
    kategorieButton.id = 'raumauswahl';
    kategorieButton.textContent = 'Alle';
    kategorieDropdown.appendChild(kategorieButton);

    const kategorieContent = document.createElement('div');
    kategorieContent.className = 'dropdown-content';

    const kategorieOptions = [
        { text: 'Standard', value: 'Standard' },
        { text: 'Premium', value: 'Premium' },
        { text: 'Luxus', value: 'Luxus' },
        { text: 'Alle', value: 'Alle' }
    ];

    kategorieOptions.forEach(option => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = option.text;
        link.setAttribute('onclick', `selectCategorie('${option.value}')`);
        kategorieContent.appendChild(link);
    });

    kategorieDropdown.appendChild(kategorieContent);
    container.appendChild(kategorieDropdown);

    // Dropdown für Bettenauswahl
    const bettenDropdown = document.createElement('div');
    bettenDropdown.className = 'dropdown';

    const bettenText = document.createElement('p');
    bettenText.textContent = 'Bettenauswahl treffen:';
    bettenDropdown.appendChild(bettenText);

    const bettenButton = document.createElement('button');
    bettenButton.className = 'dropbtn';
    bettenButton.id = 'bettauswahl';
    bettenButton.textContent = 'Alle';
    bettenDropdown.appendChild(bettenButton);

    const bettenContent = document.createElement('div');
    bettenContent.className = 'dropdown-content';

    const bettenOptions = [
        { text: 'Einzelzimmer', value: 'Einzelzimmer' },
        { text: 'Doppelzimmer', value: 'Doppelzimmer' },
        { text: 'Alle', value: 'Alle' }
    ];

    bettenOptions.forEach(option => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = option.text;
        link.setAttribute('onclick', `selectBetten('${option.value}')`);
        bettenContent.appendChild(link);
    });

    bettenDropdown.appendChild(bettenContent);
    container.appendChild(bettenDropdown);
}

function createProfileFitlerMenü(){
    const container = document.getElementById('filterGrid')

    emptyContainer(container)

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