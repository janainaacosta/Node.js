const express = require('express')
const app = express()
const port = 5000

const path = require('path')
const users = require('./users')


app.use(
    express.urlencoded({
        extended: true
    }),
)

app.use(express.json())
app.use(express.static('public'))

const basePath = path.join(__dirname, 'templates')

app.use('/users', users)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.get('/sobre', (req, res) => {
    res.sendFile(`${basePath}/sobre.html`)

})

app.get('/envio', (req, res) => {
    res.sendFile(`${basePath}/envio.html`)

})

app.listen(port, () => {
    console.log(`rodando na porta ${port}`)
})