const http = require('http');
const express = require('express')
const cors = require("cors")

const app = express();
app.use(cors())
let haustiere = [
    {
        id: 1,
        name: "bubi",
        rasse: "katze"
    },
    {
        id: 2,
        name: "blubbi",
        rasse: "goldfisch"
    },
    {
        id: 3,
        name: "blaubbi",
        rasse: "Hund"
    },
    {
        id: 4,
        name: "baubi",
        rasse: "Papagai"
    }
]

app.get('/list',(req, res) =>{
    res.json(haustiere)
   res.end();
})

app.get('/get/:id', (req, res) => {

    if(req.params.id != "1") return res.send("Diese Liste existiert nicht");
    else{
        res.json(haustiere[0])
        res.end()
    }
})


const server = http.createServer(app)

server.listen(8080);

