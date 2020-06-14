const fs = require('fs')
const process = require('process')
const axios = require('axios')

// regex to match the url domain
function retrieveName(path) {
    let re = /(?:http|https):\/\/((?:[\w]+)(?:\.[\w]+)+)(?:[\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g
    return re.exec(path)[1]
}

function getContents(filename) {
    let urls

    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) throw err
        urls = data.split('\n')
        urls = urls.slice(0, urls.length-1)
        
        // collect the promises to later resolve them all at once
        let promises = urls.map((url) => {
            return axios.get(url).catch(e => e)
        })

        // resolve all promises at once
        Promise.all(promises)
        .then(response => {
            response.forEach((resp) => {
                fs.writeFile(`${retrieveName(resp.config.url)}`, resp.data, 'utf8', err => {
                    if (err) {
                        console.log(`Unable to write to a file. Error: ${err}`)
                    }
                })
            })

        })
        .catch(err => console.log(`Unable to reach the destination. Error: ${err}`))
    })
}

getContents('urls.txt')