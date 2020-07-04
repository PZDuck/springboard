import React from "react";
import Pokedex from "./Pokedex";
import { shuffle } from "./helpers";
import pokemons from "./pokemons";

function Pokegame() {
  const firstHand = shuffle(pokemons);
  const secondHand = firstHand.splice(4);

  const hands = [firstHand, secondHand];

  const totals = [];

  hands.map((hand) =>
    totals.push(
      hand.reduce((acc, pokemon) => (acc += pokemon.base_experience), 0)
    )
  );

  let maxScore = Math.max(...totals);

  return (
    <div className="Pokegame">
      {hands.map((hand, i) => (
        <Pokedex
          key={i}
          lst={hand}
          idx={i + 1}
          total={totals[i]}
          isWinner={totals[i] === maxScore}
        />
      ))}
    </div>
  );
}

export default Pokegame;
