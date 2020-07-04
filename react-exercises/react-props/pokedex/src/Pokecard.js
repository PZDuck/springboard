import React from "react";
import "./styles/Pokecard.css";

function Pokecard(props) {
  return (
    <div className={"Pokecard"}>
      <b>{props.name}</b>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
        alt={`${props.name}-icon`}
      />
      <span>Type: {props.type}</span>
      <span>Experience: {props.exp}</span>
    </div>
  );
}

export default Pokecard;
