const http = require('http');
const express = require('express')
const cors = require("cors")
const mysql = require("mysql2")

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
        console.log(result[0].length)                              //Für mich um ergebnise in der Konsole zu
    
        for(let i = 0; i < result[0].length; i++){
            haustiere[i] = result[0][i];
            console.log(haustiere[i]);
        }
    });
}

datenBankLesen();

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



app.post('/eintrag', (req, res) => {

    const eingabe = []; //Array um die Chunks zu empfangen
    
    req.on('data', (chunk) =>{      //Die abgeschickten werden als hexadezimal Stück für Stück geladen
        eingabe.push(chunk);        //und in die eingabe als Array gelegt
        console.log("Request Succesed")
    });

    req.on('end', () =>{            //Wenn die Daten vollständig empfangen wurden
        const parsed = Buffer.concat(eingabe).toString();       //wird das Array zusammen geführt und in ein String umgewandelt
        const splitParsed = parsed.split('&');                  //Array wird bei & gesplitet
        const tierName = splitParsed[0].split('=')[1];          //Erneut bei = gesplittet und die Werte laden
        const tierRasse = splitParsed[1].split('=')[1];

        res.statusCode = 302;           
        res.writeHead(301,{
            Location: 'http://127.0.0.1:5500/Client.html'
        }).end()

        db.execute('INSERT INTO Haustiere (_name, _rasse) Values (?, ?)', [tierName, tierRasse]); //Der datenbank hinzufügen
        datenBankLesen();
    })
});


const server = http.createServer(app)

server.listen(8080);

