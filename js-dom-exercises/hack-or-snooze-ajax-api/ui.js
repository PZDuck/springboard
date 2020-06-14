$(async function() {
  // cache some selectors we'll be using quite a bit
  const $allStoriesList = $("#all-articles-list")
  const $submitForm = $("#submit-form")
  const $filteredArticles = $("#filtered-articles")
  const $loginForm = $("#login-form")
  const $createAccountForm = $("#create-account-form")
  const $ownStories = $("#my-articles")
  const $navOwnStories = $('#nav-my-stories')
  const $navLogin = $("#nav-login")
  const $navLogOut = $("#nav-logout")
  const $navUserProfile = $('#nav-user-profile')
  const $userProfile = $('#user-profile')
  const $navSubmit = $('#nav-submit')
  const $favoriteStories = $('#favorited-articles')
  const $userForm = $("#user-form")

  // global storyList variable
  let storyList = null

  // global currentUser variable
  let currentUser = null

  await checkIfLoggedIn()

  /**
   * Event listener for logging in.
   *  If successfully we will setup the user instance
   */

  $loginForm.on("submit", async function(evt) {
    evt.preventDefault()

    const username = $("#login-username").val()
    const password = $("#login-password").val()
    const userInstance = await User.login(username, password).catch(e => {
      console.log(e.response.data.error.message)
    })
    
    currentUser = userInstance
    
    syncCurrentUserToLocalStorage()
    loginAndSubmitForm()
  })

  /**
   * Event listener for signing up.
   *  If successfully we will setup a new user instance
   */

  $createAccountForm.on("submit", async function(evt) {
    evt.preventDefault() 

    let name = $("#create-account-name").val()
    let username = $("#create-account-username").val()
    let password = $("#create-account-password").val()
    const newUser = await User.create(username, password, name)

    currentUser = newUser

    syncCurrentUserToLocalStorage()
    loginAndSubmitForm()
  })

  /* Event handlers for Navigation */

  $("body").on("click", "#nav-all", async function() {
    hideElements()
    await generateStories()
    $allStoriesList.show()
  })

  $('body').on('click', '#nav-my-stories', function() {
    hideElements()
    generateOwnStories()
    $ownStories.show()
  })

  $('body').on('click', '#nav-favorites', function() {
    hideElements()
    if (currentUser) {
      generateFavoriteStories()
      $favoriteStories.show()
    }
  })


  /* Log Out Functionality */

  $navLogOut.on("click", function() {
    localStorage.clear()
    location.reload()
  })

  /* Event Handler for Clicking Login */

  $navLogin.on("click", function() {
    $loginForm.slideToggle()
    $createAccountForm.slideToggle()
    $allStoriesList.toggle()
  })


  /* Event handler that shows the submittion form for a new story */

  $navSubmit.on('click', function() {
    if (currentUser) {
      hideElements()
      $allStoriesList.show()
      $submitForm.toggleClass('hidden')
      $submitForm.removeAttr('style')
    }
  })

  /** Event handler for the form submittion. It makes an API call
   * and appends new story to the DOM
   */

  $ownStories.on('click', 'li', async function(event) {
    const $li = $(event.target).closest('li')
    const storyId = $li.attr('id')
    
    hideElements()
    $submitForm.show()

    story = await storyList.getStory(storyId)

    $('#author').val(story.data.story.author)
    $('#title').val(story.data.story.title)
    $('#url').val(story.data.story.url)
  })

  $submitForm.on('submit', async function(event) {
    event.preventDefault()

    const title = $('#title').val()
    const url = $('#url').val()
    const author = $('#author').val()
    const username = currentUser.username
    const newStory = { title, author, url, username }
    
    for (story of storyList.stories) {
      if (Object.values(newStory).every((value) => {

        // weird behaviour. For example, value === 'Bing'
        console.log(value)
        Object.values(story).includes(value)  // returns false, BUT
        console.log(Object.values(story).includes('Bing'))  // prints 'true'

      })) {
        editedStory = new Story(story.data.story)
        editedStory.updateStory(currentUser, newStory)

        return
      } 
    }

    const storyObj = await storyList.addStory(currentUser, newStory)
    const $li = generateStoryHTML(storyObj)

    $allStoriesList.prepend($li)
    $submitForm.toggleClass('hidden')

    await generateStories()

  })

  /**
   * Event handler that adds and removes story from the list of
   * favorite stories and changes the icon
   */

  $('.articles-container').on('click', '.star', async function(event) {
    const $target = $(event.target)
    const $li = $target.closest('li')
    const storyId = $li.attr('id')

    if ($target.hasClass('fas')) {
      await currentUser.removeFavorite(storyId)
      $target.closest('i').toggleClass('fas far')
    } else {
      await currentUser.addFavorite(storyId)
      $target.closest('i').toggleClass('fas far')
    }

    generateStories()
  })

  /* Event handler that shows all user's stories */

  $navOwnStories.on('click', function() {
    hideElements()
    generateOwnStories()
  })

  /* Event handler that deletes a user's story */
  $ownStories.on('click', '.trash-can', async function(event) {
    hideElements()

    const $li = $(event.target).closest('li')
    const storyId = $li.attr('id')

    await storyList.removeStory(currentUser, storyId)

    await generateStories()

    hideElements()

    $allStoriesList.show()
  })

  /* Event handler that shows user's profile information */

  $navUserProfile.on('click', function() {
    hideElements()
    $userProfile.show()
  })

  /* Event handler that shows the form to edit user's name */

  $('#edit-user').on('click', function() {
    $userForm.toggle('hidden')
  })

  /* Event handler that sends patch request to edit user's name */

  $userForm.on('submit', async function(event) {
    event.preventDefault()

    const newName = { name: $('#name').val() }
    
    await currentUser.update(newName)

  })


  /**
   * On page load, checks local storage to see if the user is already logged in.
   * Renders page information accordingly.
   */

  async function checkIfLoggedIn() {
    const token = localStorage.getItem("token")
    const username = localStorage.getItem("username")

    currentUser = await User.getLoggedInUser(token, username)
    await generateStories()

    if (currentUser) {
      generateProfile()
      showNavForLoggedInUser()
    }
  }

  /**
   * A rendering function to call the StoryList.getStories static method,
   *  which will generate a storyListInstance. Then render it.
   */

  async function generateStories() {
    const storyListInstance = await StoryList.getStories()
    storyList = storyListInstance
    $allStoriesList.empty()

    for (let story of storyList.stories) {
      const result = generateStoryHTML(story)
      $allStoriesList.append(result)
    }
  }


  /* A rendering function to run to reset the forms and hide the login info */

  function loginAndSubmitForm() {
    $loginForm.hide()
    $createAccountForm.hide()

    $loginForm.trigger("reset")
    $createAccountForm.trigger("reset")

    $allStoriesList.show()
    
    generateProfile()
    showNavForLoggedInUser()
  }

  /* A function that inserts all user's stories to the DOM */

  function generateOwnStories() {
    $ownStories.empty()
    
    if(currentUser.ownStories.length === 0) {
      $ownStories.append("No stories")
      return
    }

    for (let story of currentUser.ownStories) {
      let li = generateStoryHTML(story)
      $ownStories.append(li)
    }
  }

  /* A function that inserts all user's favorite stories to the DOM */

  function generateFavoriteStories() {
    $favoriteStories.empty()
    if (currentUser.favorites.length === 0) {
      $favoriteStories.append("No favorites")
      return
    }

    for (let story of currentUser.favorites) {
      let favorite = generateStoryHTML(story)
      $favoriteStories.append(favorite)
    }
  }

  /** A function that renders a profile page based on the
   * global currentUser instance
   */

  function generateProfile() {
    $('#profile-name').text(`Name: ${currentUser.name}`)
    $('#profile-username').text(`Username: ${currentUser.username}`)
    $('#profile-account-date').text(`Created at: ${currentUser.createdAt.slice(0, 10)}`)
    $navUserProfile.text(`${currentUser.username}`)
  }

  /* A function that changes the navigation bar for logged in user */
  
  function showNavForLoggedInUser() {
    $navLogin.hide()
    $navLogOut.show()
    $('.main-nav-links').toggle('hidden')
  }

  /* A function to render HTML for an individual Story instance */

  function generateStoryHTML(story) {
    let hostName = getHostName(story.url)
    let starType = isFavorite(story) ? "fas" : "far"
    
    const trashCanIcon = (currentUser && currentUser.ownStories.includes(story))
      ? `<span class="trash-can">
          <i class="fas fa-trash-alt"></i>
         </span>`
      : ""

    const storyMarkup = $(`
      <li id="${story.storyId}">
        ${trashCanIcon}
        <span class="star">
          <i class="${starType} fa-star"></i>
        </span>
        <a class="article-link" href="${story.url}" target="a_blank">
          <strong>${story.title}</strong>
        </a>
        <small class="article-author">by ${story.author}</small>
        <small class="article-hostname ${hostName}">(${hostName})</small>
        <small class="article-username">posted by ${story.username}</small>
      </li>
    `)

    return storyMarkup
  }

  /* A function that checks if a story is favorite */

  function isFavorite(story) {
    let favorites = new Set()
    if (currentUser) {
      favorites = new Set(currentUser.favorites.map(obj => obj.storyId))
    }
    return favorites.has(story.storyId)
  }

  /* hide all elements in elementsArr */

  function hideElements() {
    const elementsArr = [
      $submitForm,
      $allStoriesList,
      $filteredArticles,
      $ownStories,
      $loginForm,
      $createAccountForm,
      $userProfile,
      $favoriteStories
    ]
    elementsArr.forEach($elem => $elem.hide())
  }

  /* A simple function to pull the hostname from a URL */

  function getHostName(url) {
    let hostName
    if (url.indexOf("://") > -1) {
      hostName = url.split("/")[2]
    } else {
      hostName = url.split("/")[0]
    }
    if (hostName.slice(0, 4) === "www.") {
      hostName = hostName.slice(4)
    }
    return hostName
  }

  /* sync current user information to localStorage */

  function syncCurrentUserToLocalStorage() {
    if (currentUser) {
      localStorage.setItem("token", currentUser.loginToken)
      localStorage.setItem("username", currentUser.username)
    }
  }
})