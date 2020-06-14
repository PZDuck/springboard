/** Command-line tool to generate Markov text. */

const fs = require('fs')
const axios = require('axios')
const process = require('process')
const { MarkovMachine } = require('./markov')


function markovInit(text) {
    const markov = new MarkovMachine(text)
    console.log(markov.makeText())
}

function fromFile(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error: cannot read file ${path}`)
            process.exit(1)
        }
        markovInit(data)
    })
}

async function fromURL(url) {
    try {
        const resp = await axios.get(url)
        if (resp.status >= 200 && resp.status <= 300) {
            markovInit(resp.data)
        } else {
            console.log(`Error: invalid response`)
        }
    } catch(err) {
        console.log(`Error: invalid URL ${url}`)
    }
}

if (process.argv[2] == 'file') {
    fromFile(process.argv[3])
} else if (process.argv[2] == 'url') {
    fromURL(process.argv[3])
}


