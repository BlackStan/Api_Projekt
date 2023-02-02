//Dieses Programm stellt ein Client dar, welcher auf unsere eigene Api zugreift um die Daten auszulesen

//Beim verwenden des localhost kommt die nervige CORS richtlinie als Error. Dieses problem umgeht man durch folgende Schritte:
//1. Installieren des cors module > npm install cors
//2. In der package.json folgende Zeile einfügen: "proxy": "http://localhost:8080/" (sofern 8080 der Port ist)
//3. Im Webserver das cors modul anfordern > require('cors')
//4. Die Corse Methode aufrufen > app.use(cors())

var spalte = [];

fetch('http://localhost:8080/list') //API Abfragen
.then(response => response.json()) //Antwort in Json extrahieren
.then(json => {                     //Json-daten in Tabelle eintragen
    for(let i = 0; i < json.length; i++){

        console.log(json[i])
        var reihe = i +1;

        for (let i = 0; i < 3; i++) {
            var spaltenNummer = i+1;
            spalte[i] = document.querySelector("#tr-"+ reihe + " #td-" + spaltenNummer);
        }

        spalte[0].innerText = json[i].id;
        spalte[1].innerText = json[i].name;
        spalte[2].innerText = json[i].rasse;
            
    }
})
.catch(error => {
    console.log(error)
});

