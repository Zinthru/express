const fs = require('fs')
const path = require('path')
const rp = require('request-promise')
const express = require('express')

const dataPath = path.join(__dirname, 'pokemons.json')

rp('https://pokeapi.co/api/v2/pokemon')
    .then(res => JSON.parse(res))
    .then(data => {
        fs.writeFile(dataPath, JSON.stringify(data),(err) => {
            if(err) {
                console.log(err);
            }
        })
    })

const app = express()







//app.use(express.static(path.join(__dirname,'../public')))



app.get('/api/v2/pokemon', (req, res) => {
    fs.readFile(dataPath, (err,data) => {
        if (err) {
            console.log(err)
        } else {
            const pokemon = JSON.parse(data)
            res.send(pokemon)
        }
    })
})

app.listen(3000,()=> console.log("server running"))