const express = require('express')
const _ = require('lodash')
const toRoman = require('./toRoman')
var cors = require('cors')
const app = express()
const port = 3000

const numMin = 1;
const numMax = 100;

app.use(cors())

app.get('/toroman/:number', (req, res) => {
    var number = Number(req.params.number);
    if (isValidNumber(number)) {
        res.status(200).json({ result: toRoman(number) });
    } else {
        res.status(400).json(`number should be between ${numMin} and ${numMax}`);
    }
})

app.listen(port, () => {
    console.log('run');
})

function isValidNumber(number) {
    return !_.isNaN(number) && _.isNumber(number) && number <= numMax && number >= numMin
}
