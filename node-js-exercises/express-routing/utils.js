
function validateInputs(input) {
    if (!input) {
        return response.status(400).json({"message": "input required"})
    } else if (!input.split(',').every(n => parseInt(n))) {
        return response.status(400).json({"message": "invalid input"})
    }

    // initialize array of nums if inputs are valid
    return input.split(',').map(n => parseInt(n))
}

function mean(nums) {
    let total = 0
    total = nums.reduce((acc, num) => acc + num)
    return total / nums.length
}

function median(nums) {
    let median

    if (nums.length % 2 === 0) {
        median = (nums[(Math.floor(nums.length / 2)) - 1] + nums[Math.floor(nums.length / 2)]) / 2
    } else {
        median = nums[Math.floor(nums.length / 2)]
    }
    
    return median
}

function mode(nums) {
    let numsCount = {}
    let mode
    
    nums.forEach(function(num) {
        if (!numsCount[num]) {
            numsCount[num] = 1
        } else {
            numsCount[num] += 1
        }
    })

    mode = Object.keys(numsCount).filter(x => {
        return numsCount[x] === Math.max.apply(null, Object.values(numsCount))
    })
    
    // because there may be more than 1 mode, the return value is set to a string
    return mode.length === 1 ? mode[0] : mode.join(', ')
}

function makeJSON(operation, ...value) {
    if (operation === 'all') {
        return {"response": { "operation": "all", "mean": value[0], "median": value[1], "mode": value[2] }}
    }
    return {"response": { "operation": operation, "value": value[0] }}
}

function makeHTML(operation, ...value) {
    if (operation === 'all') {
        return `
            <h1>Operation All</h1>
            <ul>
              <li>Mean: ${value[0]}</li>
              <li>Median: ${value[1]}</li>
              <li>Mode: ${value[2]}</li>
            </ul>`
    }

    return `
        <h1>Operation: ${operation}</h1>
        <p>Value: ${value}</p>`
}


module.exports = {
    validateInputs,
    mean,
    median,
    mode,
    makeJSON,
    makeHTML
}