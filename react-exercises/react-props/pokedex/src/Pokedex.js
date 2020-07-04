import React from "react";
import Pokecard from "./Pokecard";
import "./styles/Pokedex.css";

function Pokedex(props) {
  return (
    <div className={`Pokedex ${props.isWinner ? "winner" : "loser"}`}>
      {props.lst.map((obj) => (
        <Pokecard
          key={obj.id}
          id={obj.id}
          name={obj.name}
          type={obj.type}
          exp={obj.base_experience}
        />
      ))}
      <div>
        <h2 className="total">TOTAL: {props.total}</h2>
        <h3>{props.isWinner ? "Winner" : "Loser"}</h3>
      </div>
    </div>
  );
}

export default Pokedex;
