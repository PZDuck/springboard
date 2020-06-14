const newTodo = document.querySelector('#new-todo')
const submit = document.querySelector('input[type="submit"]')
const todoList = document.querySelector('.todo-list')
const clearStorage = document.querySelector('#delete-all')
let allTodos = []	// Saving all todos in an array of objects


// Adding a new todo line
function addLi (content, completed=undefined) {
	let newLi = document.createElement('li')
	let completeTodo = document.createElement('button')
	let removeTodo = document.createElement('button')
	newLi.innerHTML = content
	completeTodo.innerText = 'Mark as Completed'
	removeTodo.innerText = "Remove from list"
	completeTodo.classList.add('complete')
	removeTodo.classList.add('remove')

	if (completed) {
		newLi.classList.add('completed')		
		newLi.append(completeTodo)
		newLi.append(removeTodo)
		todoList.append(newLi)
	}

	else {
		todoList.prepend(newLi)
		newLi.append(completeTodo)
		newLi.append(removeTodo)
	}
}

// Loading all existing todos from local storage
if (localStorage.getItem('todos')) {
	let savedTodos = JSON.parse(localStorage.getItem('todos'))
	allTodos = [...savedTodos]
	for (td of savedTodos) {
		addLi(td.todo, td.completed)
	}
}

// Adding a new todo after clicking on submit button
submit.addEventListener('click', function (event) {
	event.preventDefault()
	if (newTodo.value) {

		// Preventing users from creating duplicate todos
		for (td of allTodos) {
			if (td.todo === newTodo.value) {
				console.log("NONONO")
				return
			}
		}
		allTodos.push({todo: newTodo.value})
		addLi(newTodo.value)
		newTodo.value = ""
		localStorage.setItem('todos', JSON.stringify(allTodos))

	}
})

// Managing created todos with two new buttons
todoList.addEventListener('click', function (event) {
	// "Complete todo" button; Cross out the todo and save its completed state to local storage
	if (event.target.classList[0] === 'complete') {
		event.target.parentElement.classList.add('completed')
		todoList.append(event.target.parentElement)
		for (td of allTodos) {
			if (td.todo === event.target.parentElement.firstChild.data) {
				td.completed = true
				localStorage.setItem('todos', JSON.stringify(allTodos))
			}
		}
	}

	// "Remove todo" button; Remove selected todo from list and from local storage
	else {
		for (td of allTodos) {
			console.log(event.target)
			if (td.todo === event.target.parentElement.firstChild.data) {
				// Defining a function for removing a specific element from an array (filter the original array by excluding the specific item)
				let arrRemove = function (arr, val) {
					return arr.filter((elem) => {
						return elem != val
					})
				}
				allTodos = arrRemove(allTodos, td)
				localStorage.setItem('todos', JSON.stringify(allTodos))
			}
		}
		event.target.parentElement.remove()
	}
})

// Clear local storage and delete all todos
clearStorage.addEventListener('click', function () {
	localStorage.clear()
	allTodos.length = 0
	todoList.innerHTML = ""
})

// todo: [{name: 'testTodo', completed: 'true'}