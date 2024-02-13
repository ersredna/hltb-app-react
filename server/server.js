const express = require('express')
const app = express()
const PORT = 5000

let hltb = require('howlongtobeat');
let hltbService = new hltb.HowLongToBeatService();

app.get('/search/:search', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173")

    const query = req.params.search.toUpperCase()

    hltbService.search(query)
    .then(result => res.json(result))
    .catch(e => console.error(e))
})

app.get('/detail/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173")

    const id = req.params.id

    hltbService.detail(id)
    .then(result => res.json(result))
    .catch(e => console.error(e))
})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})