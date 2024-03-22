const express = require('express')
const router = express.Router()
const path = require('path')

const basePath = path.join(__dirname, '../templates')

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/userForm.html`)
})

router.post('/save', (req, res) => {

    console.log(req.body)

    const nome = req.body.nome
    const idade = req.body.idade

    console.log(`o nome do user é ${nome} e ele tem ${idade}`)

    res.sendFile(`${basePath}/userForm.html`)

})


router.get('/:id', (req, res) => {
    const id = req.params.id

    //leitura da tabela USERS para resgatar um usuario 
    console.log(`estou buscando pelo user ${id}`)

    res.sendFile(`${basePath}/users.html`)
})


module.exports = router