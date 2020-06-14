const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com"

/**
 * This class maintains the list of individual Story instances
 *  It also has some methods for fetching, adding, and removing stories
 */

class StoryList {
  constructor(stories) {
    this.stories = stories
  }

  /**
   * This method is designed to be called to generate a new StoryList.
   *  It:
   *  - calls the API
   *  - builds an array of Story instances
   *  - makes a single StoryList instance out of that
   *  - returns the StoryList instance.*
   */

  static async getStories() {
    const response = await axios.get(`${BASE_URL}/stories`)
    const stories = response.data.stories.map(story => new Story(story))
    const storyList = new StoryList(stories)
    
    return storyList
  }

  /**
   * Method to make a POST request to /stories and add the new story to the list
   * - user - the current instance of User who will post the story
   * - newStory - a new story object for the API with title, author, and url
   *
   * Returns the new story object
   */
  async getStory(storyId) {
    const response = await axios.get(`${BASE_URL}/stories/${storyId}`)

    return response
  }

  async addStory(user, newStory) {
    const response = await axios.post(`${BASE_URL}/stories`, {
      token: user.loginToken,
      story: newStory,
    })

    const story = new Story(response.data.story)
    this.stories.push(story)
    user.ownStories.push(story)

    return story
  }

  async removeStory(user, storyId) {
    await axios.delete(`${BASE_URL}/stories/${storyId}`, { data: {
        token: user.loginToken,
      }
    })

    this.stories = this.stories.filter(story => story.storyId !== storyId)
    user.ownStories = user.ownStories.filter(story => story.storyId !== storyId)
  }

}


/**
 * The User class to primarily represent the current user.
 *  There are helper methods to signup (create), login, and getLoggedInUser
 */

class User {
  constructor(userObj) {
    this.username = userObj.username
    this.name = userObj.name
    this.createdAt = userObj.createdAt
    this.updatedAt = userObj.updatedAt

    this.loginToken = ""
    this.favorites = []
    this.ownStories = []
  }

  /* Create and return a new user.
   *
   * Makes POST request to API and returns newly-created user.
   *
   * - username: a new username
   * - password: a new password
   * - name: the user's full name
   */

  static async create(username, password, name) {
    const response = await axios.post(`${BASE_URL}/signup`, {
      user: {
        username,
        password,
        name
      }
    })

    // build a new User instance from the API response
    const newUser = new User(response.data.user)

    // attach the token to the newUser instance for convenience
    newUser.loginToken = response.data.token

    return newUser
  }

  // update User's name
  async update(userData) {
    
    console.log(this.loginToken)
    const response = await axios.patch(`${BASE_URL}/users/${this.username}`, { data: {
      token: this.loginToken,
      user: userData
      }
    })

    this.name = response.data.user.name

    return this
  }

  /* Login in user and return user instance.

   * - username: an existing user's username
   * - password: an existing user's password
   */

  static async login(username, password) {
    const response = await axios.post(`${BASE_URL}/login`, {
      user: {
        username,
        password
      }
    })

    // build a new User instance from the API response
    const existingUser = new User(response.data.user)

    // instantiate Story instances for the user's favorites and ownStories
    existingUser.favorites = response.data.user.favorites.map(s => new Story(s))
    existingUser.ownStories = response.data.user.stories.map(s => new Story(s))

    // attach the token to the newUser instance for convenience
    existingUser.loginToken = response.data.token

    return existingUser
  }

  /** Get user instance for the logged-in-user.
   *
   * This function uses the token & username to make an API request to get details
   *   about the user. Then it creates an instance of user with that info.
   */

  static async getLoggedInUser(token, username) {
    // if we don't have user info, return null
    if (!token || !username) return null

    // call the API
    const response = await axios.get(`${BASE_URL}/users/${username}`, {
      params: {
        token: token,
      }
    })

    // instantiate the user from the API information
    const existingUser = new User(response.data.user)

    // attach the token to the newUser instance for convenience
    existingUser.loginToken = token;

    // instantiate Story instances for the user's favorites and ownStories
    existingUser.favorites = response.data.user.favorites.map(s => new Story(s))
    existingUser.ownStories = response.data.user.stories.map(s => new Story(s))
    return existingUser
  }

  async getUserProfile() {
    const response = await axios.get(`${BASE_URL}/users/${this.username}`, {
      params: {
        token: this.loginToken,
      }
    })

    this.name = response.data.user.name
    this.createdAt = response.data.user.createdAt
    this.updatedAt = response.data.user.updatedAt
    this.favorites = response.data.user.favorites.map(story => new Story(story))
    this.ownStories = response.data.user.stories.map(story => new Story(story))

    return this
  }


  async addFavorite(storyId) {
    if (!this.loginToken || !storyId) {
      return
    }
    
    await axios.post(`${BASE_URL}/users/${this.username}/favorites/${storyId}`, { 
      token: this.loginToken
    })
    
    await this.getUserProfile()
    return this
  }


  async removeFavorite(storyId) {
    if (!this.loginToken || !storyId) {
      return
    }

    await axios.delete(`${BASE_URL}/users/${this.username}/favorites/${storyId}`, { data:
      { token: this.loginToken }
    })
    
    await this.getUserProfile()
    return this
  }
}

/**
 * Class to represent a single story.
 */

class Story {

  /**
   * The constructor is designed to take an object for better readability / flexibility
   * - storyObj: an object that has story properties in it
   */

  constructor(storyObj) {
    this.author = storyObj.author
    this.title = storyObj.title
    this.url = storyObj.url
    this.username = storyObj.username
    this.storyId = storyObj.storyId
    this.createdAt = storyObj.createdAt
    this.updatedAt = storyObj.updatedAt
  }

  async updateStory(user, storyData) {
    const response = await axios.patch(`${BASE_URL}/${this.storyId}`, { data: {
      token: user.loginToken,
      story: storyData
    }
  })

    this.author = response.data.story.author
    this.title = response.data.story.title
    this.url = response.data.story.url
    this.updatedAt = response.data.story.updatedAt

    return this
  }


}