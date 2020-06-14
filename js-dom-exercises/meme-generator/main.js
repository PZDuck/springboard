/*	Meme Generator

A simple app, that creates a Meme Object
and forms a new DOM element out of it.
Uses localStorage.

*/

// setting global variables
let generate = document.querySelector('#generate')
let url = document.querySelector('#url')
let container = document.querySelector('main .container')
let topText = document.querySelector('#top-text')
let botText = document.querySelector('#bottom-text')
let memes = []

// custom function; removes a specific element from an array
let arrRemove = function (arr, val) {
	return arr.filter((elem) => {
		return elem != val
	})
}


class Meme {
	constructor() {
		this.url = document.querySelector('#url').value;
		this.topText = document.querySelector('#top-text').value.toUpperCase();
		this.botText = document.querySelector('#bottom-text').value.toUpperCase();
	}

	createText() {
		let topTextContainer = document.createElement('p')
		topTextContainer.classList.add('topText')
		topTextContainer.innerText = this.topText
		this.topTextContainer = topTextContainer

		let botTextContainer = document.createElement('p')
		botTextContainer.classList.add('botText')
		botTextContainer.innerText = this.botText
		this.botTextContainer = botTextContainer

		let textContainer = document.createElement('div')
		textContainer.classList.add('textContainer')
		textContainer.append(this.topTextContainer, this.botTextContainer)
		this.textContainer = textContainer
	}

	createOverlay() {
		let overlayIcon = document.createElement('img')
		overlayIcon.src = "icon/delete.png"
		overlayIcon.classList.add('overlay-icon')

		let overlay = document.createElement('div')
		overlay.classList.add('overlay')
		overlay.append(overlayIcon)

		this.overlay = overlay
	}

	createImage() {
		let image = document.createElement('img')
		image.src = this.url
		this.image = image
	}

	createMeme() {
		let meme = document.createElement('div')
		meme.classList.add('meme')
		meme.append(this.image, this.textContainer, this.overlay)
		this.display = meme
	}
}


function drawMeme(meme) {
	meme.createOverlay()
	meme.createText()
	meme.createImage()
	meme.createMeme()
	container.append(meme.display)
}


function resetInputs() {
	url.value = ''
	url.classList.remove('is-invalid')
	topText.value = ''
	botText.value = ''
}

// load and create saved memes from localStorage
window.addEventListener('load', function() {
	if (localStorage.memes) {
		memes = JSON.parse(localStorage.memes)
	}

	if (memes) {
		for (meme of memes) {
			url.value = meme.url
			topText.value = meme.topText
			botText.value = meme.botText

			let newMeme = new Meme()
			
			drawMeme(newMeme)
			
			resetInputs()
		}
	}
})

// create a meme on button press
generate.addEventListener("click", function (event) {
	event.preventDefault()

	if (!url.value) {
		url.classList.add('is-invalid')
		return
	}
	
	let newMeme = new Meme()

	drawMeme(newMeme)

	memes.push({'url': url.value, 'topText': topText.value, 'botText': botText.value})	// saving to localStorage
	localStorage.setItem('memes', JSON.stringify(memes))

	resetInputs()

	document.querySelector('.meme:last-child').scrollIntoView({	// auto scroll to a new meme
		behavior: 'smooth'
	})
})

// delete meme after pressing an overlay button
container.addEventListener("click", function (event) {
	
	if (event.target.className === 'overlay-icon') {
		let m = (memes) => {for (meme of memes) {
			// Needs reviewing
			if (meme.url === event.target.parentElement.parentElement.firstChild.src) {
				return meme
			}
		}}

		memes = arrRemove(memes, m(memes))

		localStorage.setItem('memes', JSON.stringify(memes))	// removing from locaStorage
		event.target.closest('.meme').remove()
	}
})
