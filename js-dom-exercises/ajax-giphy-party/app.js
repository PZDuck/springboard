const api_key = 'J0U3rEocXO0Vki5PVm1eBmE8YVrK0HNk'
const allGifs = []


class Gif {
	constructor(url) {
		this.url = url
		this.rating = 0
	}

	upvote() {
		this.rating += 1
	}

	downvote() {
		this.rating -= 1
	}
}


async function fetchGif(keyword) {
	const gif = await axios.get(`https://api.giphy.com/v1/gifs/search`, {params: {q: keyword, api_key: api_key}})
	let fetchId = Math.floor(Math.random() * gif.data.data.length)
	return gif.data.data[fetchId]
}


function appendGif(gif) {
	let embeddedGif = document.createElement('img')
	embeddedGif.setAttribute('src', gif.url)

	let voteUpBtn = document.createElement('button')
	voteUpBtn.classList.add('btn')
	voteUpBtn.classList.add('btn-success')
	voteUpBtn.innerHTML = "Upvote"

	let voteDownBtn = document.createElement('button')
	voteDownBtn.classList.add('btn')
	voteDownBtn.classList.add('btn-danger')
	voteDownBtn.innerHTML = "Downvote"

	let gifRating = document.createElement('p')
	gifRating.classList.add('gif-rating')
	gifRating.innerHTML = `${gif.rating}`

	let gifWrapper = document.createElement('div')
	gifWrapper.classList.add('gif-wrapper')
	gifWrapper.append(embeddedGif)
	gifWrapper.append(voteUpBtn)
	gifWrapper.append(voteDownBtn)
	gifWrapper.append(gifRating)

	let gifContainer = document.querySelector('.gifs')
	gifContainer.append(gifWrapper)

}

const form = document.querySelector('#search')
form.addEventListener('submit', async function handleSearch (event) {
	event.preventDefault()

	let gif = new Gif()
	let gifObj = await fetchGif(document.querySelector('#search-gif').value)
	gif.url = gifObj.images.original.url

	allGifs.push(gifObj)
	appendGif(gif)

})


const removeAllBtn = document.querySelector('.remove-all-gifs')
removeAllBtn.addEventListener('click', () => {
	document.querySelector('.gifs').innerHTML = ""
})


const gifContainer = document.querySelector(".gifs")
gifContainer.addEventListener('click', function (event) {
	if (event.target.className === 'btn-danger') {
		event.target
	}
})
