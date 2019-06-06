const express = require('express')
const app = express()
const axios = require('axios');
axios.defaults.headers.common['Bankin-Version'] = '2018-06-15'
const port = 3000

app.get('/', (req, res) => {
    let email = 'user2@mail.com'
    let password = 'a!Strongp#assword2'
    bridgeAuth(email, password)
    console.log(process.env.clientId)
})

function bridgeAuth (email, password) {
    let params = `email=${email}&password=${password}&client_id=${process.env.clientId}&client_secret=${process.env.secretId}`
    axios.post(`${process.env.bridgeUrl}/authenticate?${params}`)
    .then(res => {
        console.log(res)
    })
}

function listAccounts () {
    var config = {
        headers: {'Authorization': "bearer " + token}
    };
    axios.post(`${process.env.bridgeUrl}/accounts?client_id=${process.env.clientId}&client_secret=${process.env.secretId}`, config)
    .then(accounts => {
        sumAccounts(accounts.data)
    })
}

function sumAccounts(accounts) {
    let balance = 0
    for (let i = 0; i < accounts.ressources.length; i++) {
        balance += accounts.resources[i].balance
    }
    console.log(balance)
}

app.listen(port, () => console.log(`BankApi app listening on port ${port}!`))