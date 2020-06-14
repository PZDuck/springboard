let allPokemons

async function fetchAll() {
    let resp = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=964`)
    return resp.data.results
}

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

async function makeCard(pokemon) {
    let resp = await axios.get(pokemon.species.url)
    let description

    for (let i = 0; i < resp.data.flavor_text_entries.length; i++) {
        if (resp.data.flavor_text_entries[i].language.name === 'en') {
            description = resp.data.flavor_text_entries[i].flavor_text
            break
        }
    }
    return `
    <div class="card">
      <h3>${pokemon.name}</h3>
      <img src="${pokemon.sprites.front_default ? pokemon.sprites.front_default : './icons/q.png'}">
      <p>${description}</p>
    </div>
    `
}

async function getThree() {
    allPokemons = await fetchAll()

    let container = document.getElementById('pokemons')
    container.innerHTML = ""

    for (let i = 0; i < 3; i++) {
        let pokemon = getRandom(allPokemons)
        let resp = await axios.get(pokemon.url)
        container.innerHTML += await makeCard(resp.data)
    }
}

document.getElementById('catch').addEventListener('click', getThree)