const http = require('http')
const express = require('express')
const cors = require("cors")
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Beispiel123",
    database: "ApiDatenBank"
});

const db = pool.promise();
var haustiere = []

function datenBankLesen(){
    db.execute('Select * From Haustiere').then(result => {
        //console.log(result[0].length)                              //Für mich um ergebnise in der Konsole zu
    
        for(let i = 0; i < result[0].length; i++){
            haustiere[i] = result[0][i];
           // console.log(haustiere[i]);
        }
    });
}



setInterval(datenBankLesen, 200);

const app = express();
app.use(cors())

app.get('/list',(req, res) =>{
    res.json(haustiere)
   res.end();
})



app.get('/get/:id', (req, res) => {
    var ItemId = parseInt(req.params.id);
    const hausTier = haustiere.filter(item =>{
        return item.id == ItemId
    })

    res.json(hausTier)
    res.end();
});

app.post('/eintrag', (req, res) =>{

    const eingabe = [];

    req.on("data", (chunk) =>{
        eingabe.push(chunk);
    })

    req.on("end", () =>{
        const parsed = Buffer.concat(eingabe).toString();
        const splitEingabe = parsed.split(',');

        db.execute('INSERT INTO Haustiere (_name, _rasse) Values (?, ?)', [splitEingabe[0], splitEingabe[1]]);
        datenBankLesen();
    })

});

function perxhrsenden(){
    console.log("Klappt");
    
    var name = $('#_name').val()
    var rasse = $('#_rasse').val();

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/eintrag");

    const data = [name, rasse]
    console.log(data);
    xhr.send(data);
}

const server = http.createServer(app)

server.listen(8080);

