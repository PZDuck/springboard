import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import VendingMachine from "./VendingMachine";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <VendingMachine />
      </BrowserRouter>
    </div>
  );
}

export default App;
