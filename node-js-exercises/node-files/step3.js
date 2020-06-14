const fs = require('fs')
const process = require('process')
const axios = require('axios')

function cat(path, filename) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}:`, err)
            process.exit(1)
        }

        output(data, filename)
    })
}

async function webCat(url, filename) {
    await axios.get(url)
        .then(resp => output(resp.data, filename))
        .catch(err => console.log(`Error fetching ${url}: `, err))
}

function output(data, filename) {
    if (filename) {
        fs.writeFile(filename, data, 'utf8', err => {
            if (err) {
                console.log(`Couldn't write ${filename}: `, err)
                process.exit(1)
            }
        })
    } else {
        console.log(data)
    }
}


function execute() {

    let original = process.argv[2]
    let destination

    if (original === '--out') {
        original = process.argv[4]
        destination = process.argv[3]
    } else if (process.argv.length > 3) {
        console.log("Error: too many arguments (expected 1)")
        process.exit(1)
    }

    if (original.includes('http://') || original.includes('https://')) {
        webCat(original, destination)
    } else {
        cat(original, destination)
    }
}

execute()