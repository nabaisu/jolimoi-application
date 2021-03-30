const express = require('express');
const toRoman = require('./toRoman');
const _ = require('lodash');
var cors = require('cors');
const app = express()
const port = 3000

const numMin = 1;
const numMax = 100;

app.use(cors())

var clients = [];
var value;
const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
};

function handleConnections(req, res) {
    res.writeHead(200, headers);
    res.write(`data: ${JSON.stringify({ result: "ready to translate" })}\n\n`);

    const clientId = Date.now();
    const newClient = {
        id: clientId,
        response: res
    };

    clients.push(newClient);
    req.on('close', () => {
        clients = clients.filter(client => client.id !== clientId); // remove the client
    });
}

app.get('/connect', handleConnections);
app.get('/toroman/:number', (req, res) => {
    var number = Number(req.params.number);
    if (isValidNumber(number)) {
        value = toRoman(number);
        return sendValueToAll(value);
    } else {
        res.status(400).json(`number should be an int between ${numMin} and ${numMax}`);
    }
})

function sendValueToAll(number) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify({ result: number })}\n\n`))
}

function isValidNumber(number) {
    return !_.isNaN(number) && _.isNumber(number) && number <= numMax && number >= numMin
}

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})

