import React from "react";
import "./App.css";
import NavBar from "./NavBar";
import Routes from "./Routes";

function App() {
  return (
    <div className="App">
      <NavBar />
      <h1>Welcome to Shoply!</h1>
      <Routes />
    </div>
  );
}

export default App;
