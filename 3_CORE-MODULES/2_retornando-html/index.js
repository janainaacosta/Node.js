const http = require('http')

const port = 3001

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('contenty-Type', 'text/html')
    res.end('<h1>meu primeiro server com HTNL</h1> ')
})

server.listen(port, () => {
  console.log(`servidor rodando na porta: ${port}`)
})
