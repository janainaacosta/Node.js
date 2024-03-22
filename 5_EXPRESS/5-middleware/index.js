const express = require('express')
const app = express()
const port = 3000

const path = require('path')


const basePath = path.join(__dirname, 'templates')


//PERMISSAO PARA SEGUIR

const checkAuth = function(req, res, next){
    req.authStatus = true

    if(req.authStatus){
        console.log("Log in efetuado: pode continuar")
        next()
    } else {
        console.log("Log in não efetuado: não pode continuar")
        next()
    }
}

app.use(checkAuth)

app.get("/", (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {


    console.log(`app na porta ${port}`)
})