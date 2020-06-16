let btn = document.getElementById("search-btn")
let list = document.getElementById("customers")

btn.addEventListener('click', async function(event) {
    event.preventDefault()
    list.innerHTML = ''
    let name = document.querySelector('input').value
    console.log(name)
    
    try {
        const customers = await axios.get(`/customers/search?name=${name}`)

        if (customers.data.length === 0) {
            list.innerHTML += 'No results'
        } else {
            for (let customer of customers.data) {
                console.log(customer)
                list.innerHTML += (`<li><a href='customers/${customer.id}'>${customer.fullName}</a></li>`)
            }
        }
        document.querySelector('input').value = ''
    } catch (e) {
        console.log(e)
    }
})