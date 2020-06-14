const fs = require('fs')
const process = require('process')
const axios = require('axios')

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}:`, err)
            process.exit(1)
        }

        console.log(data)
    })
}

async function webCat(url) {
    await axios.get(url)
        .then(resp => console.log(resp.data))
        .catch(err => console.log(`Error fetching ${url}: `, err))
}

function execute() {
    if (process.argv.length > 3) {
        console.log("Error: too many arguments (requires 1)")
        process.exit(1)
    }

    let arg = process.argv[2]

    if (arg.includes('http://') || arg.includes('https://')) {
        webCat(arg)
    } else {
        cat(arg)
    }
}

execute()