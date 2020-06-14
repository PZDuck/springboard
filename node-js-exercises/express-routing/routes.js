const express = require('express')
const { validateInputs, mode, median, mean, makeJSON, makeHTML } = require('./utils');

const app = express()

app.use(express.json())


app.get('/mean', (request, response) => {
    const nums = validateInputs(request.query.nums)

    if (request.headers.accept.includes("application/json")) {
        return response.json(makeJSON('mean', mean(nums)))
    } else {
        return response.send(makeHTML('mean', mean(nums)))
    }
})

app.get('/median', (request, response) => {
    const nums = validateInputs(request.query.nums)

    if (request.headers.accept.includes("application/json")) {
        return response.json(makeJSON('median', median(nums)))
    } else {
        return response.send(makeHTML('median', median(nums)))
    }
})

app.get('/mode', (request, response) => {
    const nums = validateInputs(request.query.nums)

    if (request.headers.accept.includes("application/json")) {
        return response.json(makeJSON('mode', mode(nums)))
    } else {
        return response.send(makeHTML('mode', mode(nums)))
    }
})

app.get('/all', (request, response) => {
    const nums = validateInputs(request.query.nums)
    
    if (request.headers.accept.includes("application/json")) {
        return response.json(makeJSON('all', mean(nums), median(nums), mode(nums)))
    } else {
        return response.send(makeHTML('all', mean(nums), median(nums), mode(nums)))
    }
})

app.listen(3000, function () {
    console.log('Listening on port 3000')
})