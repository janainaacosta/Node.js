const express = require('express');
const path = require('path');
const router = express.Router();

const basePath = path.join(__dirname, '..', 'templates');

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/envio.html`)
})

router.post('/save', (req, res) => {
    console.log(req.body)

    const nome = req.body.nome
    const tel = req.body.nome
    const email = req.body.email

    console.log(`telefone: ${tel} email: ${email} do user ${nome}.`)

    res.sendFile(`${basePath}/envio.html`)
})

module.exports = router
