import React from "react";
import { NavLink } from "react-router-dom";
import Routes from "./Routes";
import "./App.css";

function App() {
  return (
    <div className="App container">
      <header className="App-header jumbotron mt-2">
        <h1 className="App-title display-4">Microblog</h1>
        <nav>
          <NavLink exact to="/">
            Blog
          </NavLink>
          <NavLink exact to="/new">
            New Post
          </NavLink>
        </nav>
      </header>

      <Routes />
    </div>
  );
}

export default App;
