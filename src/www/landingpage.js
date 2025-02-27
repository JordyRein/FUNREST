document.addEventListener('DOMContentLoaded', function() {
    ladeBewertungen()
    document.getElementById('headerButton').addEventListener('click', function() {
        window.location.href = 'visitorpage.html';
    });
});

// const ArrayBewertungen = [
//     {
//         id: 'kl523',
//         kunde: {vorname: "Hans",
//                 nachname: "Wurst", 
//                 strHausnummer: "Fleischeralle 9",
//                 plz: '23487',
//                 stadt: "Hackstadt",
//                 geschlecht: "d",
//                 gebdatum: new Date()},
//         titel: 'richtiges Schmankerl hier',
//         text: 'Bartwurstkeksemmeln sind geil, weil sie die perfekte Kombination aus den würzigen, herzhaften Aromen der Bratwurst und der weichen, fluffigen Textur eines frischen Brötchens bieten. Diese Köstlichkeit, die in Deutschland und darüber hinaus beliebt ist, ist nicht nur ein Geschmackserlebnis, sondern auch eine Hommage an die traditionelle deutsche Küche. Ob nun beim Frühstück, Mittagessen oder als Snack, die Bartwurstkeksemmeln sind ein Fest für den Gaumen und vereinen Einfachheit mit Genuss auf eine Weise, die sowohl satt als auch zufrieden macht.', 
//         sterne: 5,
//         freigegeben: true
//     },
//     {
//         id: 'gt123',
//         kunde: {vorname: "Hans",
//                 nachname: "Wurst", 
//                 strHausnummer: "Fleischeralle 9",
//                 plz: '23487',
//                 stadt: "Hackstadt",
//                 geschlecht: "d",
//                 gebdatum: new Date()},
//         titel: 'doof wars',
//         text: 'naja a bissala arsch wars halt', 
//         sterne: 1,
//         freigegeben: true
//     },
// ]
let ArrayBewertungen

async function fetchBewertungen(suchbegriff){
    const url = "AdminSearch.php?req=Bewertung&open="+encodeURIComponent(suchbegriff);
    console.log('suchbegriff', suchbegriff)
    await RequestPHPAsync(url, (data)=>{
        const bewertung = JSON.parse(data)
        ArrayBewertungen = bewertung
    }, ()=>{})
}

async function ladeBewertungen(){
    const bewertungsContainer = document.getElementById('bewertungen')
    await fetchBewertungen('1').then((value)=>{
        ArrayBewertungen.forEach(bewertung => {
            console.log(bewertung)

            const bewertungDiv = document.createElement('div');
            bewertungDiv.id = bewertung.BewertungId;
            bewertungDiv.style.marginBottom = '20px'
    
            const bildBewertung = document.createElement('div');
            bildBewertung.className = 'bildBewertung';
    
            const nameHeader = document.createElement('h3');
            nameHeader.textContent = bewertung.KundeVorname + ' ' + bewertung.KundeNachname
            bildBewertung.appendChild(nameHeader);
    
            const profilbild = document.createElement('img');
            profilbild.className = 'profilbild';
            profilbild.src = 'profilbildPlatzhalter.png';
            profilbild.alt = 'Platzhalter für Profilbild';
            profilbild.height = 60;
            bildBewertung.appendChild(profilbild);
    
            // Text-Bewertung Bereich
            const textBewertung = document.createElement('div');
            textBewertung.className = 'textBewertung';
    
            const titelHeader = document.createElement('h3');
            titelHeader.textContent = bewertung.Titel
            textBewertung.appendChild(titelHeader);
    
            const bewertungText = document.createElement('p');
            bewertungText.textContent = bewertung.BewertungText;
            textBewertung.appendChild(bewertungText);
    
            // Sternbewertung Bereich
            const scaleBewertung = document.createElement('div');
            scaleBewertung.className = 'scaleBewertung';
    
            // Leeres div als Platzhalter
            const emptyDiv = document.createElement('div');
            scaleBewertung.appendChild(emptyDiv);
    
            // Sterne hinzufügen
            let sterne = parseInt(bewertung.Rating)
            for(let i = 0; i < sterne;i++){
                const starDiv = document.createElement('div');
                starDiv.className = 'star';
                starDiv.textContent = '★';
                scaleBewertung.appendChild(starDiv);
            }
            let leereSterne = 5 - sterne
            for(let i = 0; i < leereSterne; i++){
                const starDiv = document.createElement('div');
                starDiv.className = 'star';
                starDiv.textContent = '☆';
                scaleBewertung.appendChild(starDiv);
            }
    
            // Alles zum Hauptcontainer hinzufügen
            bewertungDiv.appendChild(bildBewertung);
            bewertungDiv.appendChild(textBewertung);
            bewertungDiv.appendChild(scaleBewertung);
    
            bewertungsContainer.appendChild(bewertungDiv)
        })
    
    })
    
}