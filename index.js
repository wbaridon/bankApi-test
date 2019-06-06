const express = require('express')
const app = express()
const axios = require('axios');
const port = 3000

app.get('/', (req, res) => {
    let email = 'user2@mail.com'
    let password = 'a!Strongp#assword2'
    bridgeAuth(email, password)
    console.log(process.env.clientId)
})

function bridgeAuth (email, password) {
    let baseUrl = 'https://sync.bankin.com/v2'
    let params = `email=${email}&password=${password}&client_id=${process.env.clientId}&client_secret=${process.env.secretId}`
    console.log(params)
    axios.post(`${baseUrl}/authenticate?${params}`)
    .then(res => {
        console.log(res)
    })
}

app.listen(port, () => console.log(`BankApi app listening on port ${port}!`))