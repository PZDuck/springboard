function get(url) {
    let request = new XMLHttpRequest()
    return new Promise((resolve, reject) => {
        request.onload = function() {
            if (request.readyState !== 4) return

            if (request.status == 200) {
                resolve(JSON.parse(request.response))
            }

            reject(request.status)
        }

        request.onerror = function handleError() {
            reject(request)
        }

        request.open('GET', url)
        request.send()
    })
    .catch(err => console.log(err))
}

function getMultipleFacts(nums) {
    get(`http://numbersapi.com/${nums.join(',')}?json`)
        .then(res => {
            for (key of Object.keys(res)) {
                factsList = document.getElementById('facts')
                let node = document.createElement('li')
                let text = document.createTextNode(res[key].text)
                node.appendChild(text)
                factsList.appendChild(node)
            }
        })
}


function getFourFacts(num) {
    let facts = []

    for (let i = 0; i < 4; i++) {
        let r = get(`http://numbersapi.com/${num}?json`)
        facts.push(r)
    }

    Promise.all(facts)
        .then(factsArr => {
            factsList = document.getElementById('facts')
            factsArr.forEach(f => {
                let node = document.createElement('li')
                let text = document.createTextNode(f.text)
                node.appendChild(text)
                factsList.appendChild(node)
            })
        })
        .catch(err => console.log(err))
}

getMultipleFacts([1,2,3])
getFourFacts(5)