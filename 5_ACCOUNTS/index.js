const inquirer = require('inquirer')
const chalk = require('chalk')

const fs = require('fs')

operation()

function operation() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
          'criar conta',
          'consultar saldo',
          'depositar',
          'sacar',
          'sair',
        ],
      },
    ])
    .then((answer) => {
      const action = answer['action']

        if(action === 'criar conta'){
            createAccount()
        } 
        
        else if(action === 'depositar'){
            deposit()


        } 
        
        else if(action === 'consultar saldo'){
            getAccountBalance()
        } 
        
        else if(action === 'sacar'){
            withdraw()
        }
        
        else if (action === 'sair'){
            console.log(chalk.bgBlueBright('obrigada por usar o accounts!'))
            process.exit
        }

    }
        
    )
    .catch((err) => console.log(err))
}

function createAccount() {
    console.log(chalk.bgGreen.black("obrigada por escolher nosso banco"))
    console.log(chalk.green("defina as opcoes da sua conta a seguir"))

    buildAccount()
}


function buildAccount(){
    inquirer.prompt([
       {    
            name: 'accountName',
            message: 'digite um nome para sua conta'
        }
    ])
    .then((answer => {
        const accountName = answer['accountName']

        console.info(accountName)

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.white('nome de conta já utilizado'),
            )
            buildAccount()
            return
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`, 
            '{"balance": 0}',
            function(err){
                console.log(err)
            },
        )
            
            console.log(chalk.green('sua conta foi criada!'))
            operation()
    }))
    .catch(err => console.log(err))
}


// adicionar um valor 
function deposit() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'nome da conta'
        }
    ])
    .then((answer) => {

        const accountName = answer['accountName']

        // verificar se existe
        if(!checkAccount(accountName)){
            return deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'quanto quer depositar?'
            },
        ])
        .then((answer) => {

            const amount = answer['amount']

            // adiciona valor
            addAmount(accountName, amount)
            operation()

        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}


function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.white('nome de conta indisponível'))
        
        return false
    }

    return true
}

function addAmount(accountName, amount){

    const accountData = getAccount(accountName)



    if(!amount){
        console.log(chalk.bgRed('ocorreu um erro')
        )
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)


    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err){
            console.log(err)
        },
    )

    console.log(chalk.green(`foi depositado ${amount}`),
    )
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}

//mostrar saldo


function getAccountBalance() {
    inquirer
      .prompt([
        {
          name: 'accountName',
          message: 'Qual o nome da sua conta?',
        },
      ])
      .then((answer) => {
        const accountName = answer['accountName']
  
        if (!checkAccount(accountName)) {
          return getAccountBalance()
        }

        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(`seu saldo é ${accountData.balance}`,
        ),
        
        )
        operation()

       
      })
  }


  // sacar dinheiro
  function withdraw() {

    inquirer.prompt([
        {
            name: "accountName",
            message: "qual o nome da sua conta?"
        }
    ]).then((answer) => {



        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            return withdraw()
        }

        inquirer.prompt([
            {
                name: "amount",
                message: "quanto voce deseja sacar?"
            }
        ])
        .then((answer) => {


            const amount = answer['amount']

            removeAmount(accountName, amount)


        })
        .catch((err) => console.log(err))


    }).catch((err) => console.log(err))


  }

  function removeAmount(accountName, amount){
    const accountData = getAccount(accountName)


    if(!amount){
       
        console.log(chalk.bgRed("ocorreu um erro nesta operação!"),
        )
        return withdraw()
    }

    if(accountData.balance < amount) {
        console.log(chalk.bgRed("Saldo indisponivel!"),
        )
        return withdraw()

    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err){
            console.log(err)
        }
    )
    console.log(chalk.bgGreen(`Foi realizado um saque de ${amount} da sua conta`),
    )
    operation()
  }