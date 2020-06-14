/** processForm: get data from form and make AJAX call to our API. */

async function processForm(evt) {
    evt.preventDefault()
    let response = await axios.post("/api/get-lucky-num", { data: {
        'name': $('#name')[0].value,
        'year': $('#year')[0].value,
        'email': $('#email')[0].value,
        'color': $('#color')[0].value
    }
  })
  
  handleResponse(response)
}

/** handleResponse: deal with response from our lucky-num API. */

function handleResponse(resp) {
    const data = resp['data']
    $('b').empty()

    if (data['errors'] !== undefined) {
        for (err of Object.keys(data['errors'])) {
            console.log(`${err}-err`)
            $(`#${err}-err`).append(data['errors'][err])
        }
        return
    }

    $container = $('#lucky-results')
    $container.append(
        `<p>Your lucky number is ${data['num']['num']}. ${data['num']['fact']}</p>`,
        `<p>Your birth year ${data['year']['year']}. Fact is ${data['year']['fact']}</p>`
    )
}


$("#lucky-form").on("submit", processForm);
