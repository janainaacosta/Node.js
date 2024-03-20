const http = require('http')

// const url = require('url')

const port = 3001

const server = http.createServer((req, res) => {
    
    const urlInfo = require('url').parse(req.url, true)

    const name = urlInfo.query.name

    res.statusCode = 200
    res.setHeader('contenty-Type', 'text/html')
  

    if(!name){
        res.end('<h1>escreva seu nome</h1> <form method="GET"> <input type="text" name="name"/> <input type="submit" name="submit" value="enviar"/>  </form>')
    }else{
        res.end(`<h1> seja bem vindo ${name}</h1>`)
    }
})

server.listen(port, () => {
  console.log(`servidor rodando na porta: ${port}`)
})
