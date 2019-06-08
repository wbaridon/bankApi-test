const express = require('express')
const app = express()
const axios = require('axios');
axios.defaults.headers.common['Bankin-Version'] = '2018-06-15'
const port = 3000

app.get('/', (req, res) => {
    let email = 'user2@mail.com'
    let password = encodeURIComponent('a!Strongp#assword2')
    bridgeAuth(email, password).then(balance => {
        res.status(200).send({balance})
    })
})

function bridgeAuth (email, password) {
    return new Promise ((resolve) => {
        let params = `email=${email}&password=${password}&client_id=${process.env.clientId}&client_secret=${process.env.secretId}`
        axios.post(`${process.env.bridgeUrl}/authenticate?${params}`)
        .then(res => {
            listAccounts(res.data['access_token']).then(sum => {
                resolve(sum)
            })
        })         
    })
}

function listAccounts (token) {
    return new Promise ((resolve) => {
        var config = {
            headers: {'Authorization': "Bearer " + token}
        };
        axios.get(`${process.env.bridgeUrl}/accounts?client_id=${process.env.clientId}&client_secret=${process.env.secretId}`, config)
        .then(accounts => {
            sumAccounts(accounts.data).then(balance => {
                resolve(balance)
            })
        })
    })
}

function sumAccounts(accounts) {
    return new Promise ((resolve) => {
        let balance = 0
        for (let i = 0; i < accounts.resources.length; i++) {
            balance += accounts.resources[i].balance
        }
        resolve(balance)
    })
}

app.listen(port, () => console.log(`BankApi app listening on port ${port}!`))