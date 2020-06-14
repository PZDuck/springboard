const BASE_URL = "http://127.0.0.1:5000/api"


class CupcakeList {
  constructor() {
    this.cupcakesList = $('.cupcakes-list')
    this.cupcakeForm = $('#cupcake-form')
    this.searchForm = $('#search-form')
  }

  async showCupcakes() {
    const response = await axios.get(`${BASE_URL}/cupcakes`)

    for (let cupcakeData of response.data.cupcakes) {
      let newCupcake = new Cupcake(cupcakeData)
      this.cupcakesList.append(newCupcake.generateCupcakeHTML())
    }
  }

  async showFilteredCupcakes(event) {
    event.preventDefault()

    let flavor = $("#search-flavor").val()
  
    const filteredCupcakesResponse = await axios.get(`${BASE_URL}/cupcakes`, { params: {"flavor": flavor}})
    
    this.cupcakesList.empty()
  
    if (filteredCupcakesResponse.data.cupcakes.length === 0) {
      $(".cupcakes-list").html("No results")
    }
  
    for (let cupcakeData of filteredCupcakesResponse.data.cupcakes) {
      let newCupcake = new Cupcake(cupcakeData)
      this.cupcakesList.append(newCupcake.generateCupcakeHTML())
    }
  }

  async createCupcake(event) {
    event.preventDefault()
  
    let flavor = $("#flavor").val()
    let rating = $("#rating").val()
    let size = $("#size").val()
    let image = $("#image").val()
    let csrf_token = $("#csrf_token").val()
  
    const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
      "flavor": flavor,
      "rating": rating,
      "size": size,
      "image": image
    }, { 
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf_token
      }
    })
    
    let newCupcake = new Cupcake(newCupcakeResponse.data.cupcake)
    this.cupcakesList.append(newCupcake.generateCupcakeHTML())
    this.cupcakeForm.trigger("reset")
  }

  async deleteCupcake(event) {
    event.preventDefault()
  
    let $cupcake = $(event.target).closest("div")
    let cupcakeId = $cupcake.attr("data-cupcake-id")
  
    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
    $cupcake.remove()
  }

  async init() {
    await this.showCupcakes()
    this.cupcakeForm.on("submit", this.createCupcake.bind(this))
    this.searchForm.on("submit", this.showFilteredCupcakes.bind(this))
    this.cupcakesList.on("click", ".delete-button", this.deleteCupcake.bind(this))
  }
}


class Cupcake {
  constructor(cupcake_obj) {
    this.id = cupcake_obj.id
    this.flavor = cupcake_obj.flavor
    this.size = cupcake_obj.size
    this.rating = cupcake_obj.rating
    this.image = cupcake_obj.image
  }

  generateCupcakeHTML() {
    return `
      <div data-cupcake-id=${this.id} class="card cupcake" style="width: 18rem;">
        <img class="card-img-top cupcake-img" src="${this.image}">
        <div class="card-body">
          <h5 class="card-title">${this.flavor}</h5>
          <p class="card-text">Size: <i>${this.size}</i></p>
          <small>Rating: ${this.rating} / 10</small>
        </div>
        <button class="delete-button btn btn-danger">X</button>
      </div>
    `
  }
}

const instance = new CupcakeList()
instance.init()