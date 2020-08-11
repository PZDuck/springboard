# starwarsly

Learn about the Star Wars universe!

Discover Star Wars! Start from the unknown and reveal the names of films, planets and people during the exploration every time you open a link. All data is retrieved from the Star Wars API [https://swapi.dev/].

#### Created using

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [axios](https://github.com/axios/axios)
- [redux-persist](https://github.com/rt2zz/redux-persist/)
- [react-redux](https://github.com/reduxjs/react-redux)
- [redux-thunk](https://github.com/reduxjs/redux-thunk)
- [SWAPI.dev](https://swapi.dev/) - The Star Wars API

## Installation

Clone the repo and install the dependencies:

```
> git clone https://github.com/sivadej/starwarsly.git
> cd starwarsly
> npm i
> npm start
```

## How it Works

All initial data will be hidden from the user and marked as "Unknown". Accessing the "Unknown" link will reveal the data and keep it visible to the user

The App is using Redux to store the state of data for films, planets, and people. State for each of these are managed as independent objects within the store. `Redux-persist` allows the data to remain in localStorage so that the data will persist between sessions.

### Structure

- App
  - NavBar
  - Router
  - HomePage
  - FilmList
    - ItemList (films)
  - PersonList
    - ItemList (people)
  - PlanetList
    - ItemList (planets)
  - Film (id)
    - Sublist (planets)
    - Sublist (people)
  - Person (id)
    - Sublist (films)
  - Planet (id)
    - Sublist (films)
    - Sublist (people)

## Authors

- Developed by Rithm School
