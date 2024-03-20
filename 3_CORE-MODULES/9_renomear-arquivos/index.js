const fs = require('fs')


const arqAntigo = 'arquivo.txt'

const arqNovo = 'arquivo-novo.txt'

fs.rename(arqAntigo, arqNovo, function(err){

    if(err){
        console.log(err)
        return

    }

    console.log(`renomeado para ${arqNovo}`)

})