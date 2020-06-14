const fs = require('fs')

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}:`, err)
            process.exit(1)
        }

        console.log(data)
    })
}

function execute() {
    if (process.argv.length > 3) {
        console.log("Error: too many arguments (requires 1)")
        process.exit(1)
    }

    cat(process.argv[2])
}

execute()