const express = require('express')
const app = express()
const port = 3000

const path = require('path')



// LER O CORPO DA RQUISIÇÃO

app.use(express.urlencoded({
    extended: true,
}),

)

app.use(express.json())


const basePath = path.join(__dirname, 'templates')

app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/userForm.html`)
})

app.post('/users/save', (req, res) => {


    console.log(req.body)

    const nome = req.body.nome
    const idade = req.body.idade

    console.log(`o nome do user é ${nome} e ele tem ${idade}`)

    res.sendFile(`${basePath}/userForm.html`)

})


app.get('/users/:id', (req, res) => {
    const id = req.params.id

    //leitura da tabela USERS para resgatar um usuario 
    console.log(`estou buscando pelo user ${id}`)

    res.sendFile(`${basePath}/users.html`)
})


app.get("/", (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {


    console.log(`app na porta ${port}`)
})


