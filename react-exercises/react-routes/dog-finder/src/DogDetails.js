import React from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import "./DogDetails.css";

function DogDetails({ dogs }) {
  const { name } = useParams();

  if (!name) return <Redirect to="/dogs" />;

  const dog = dogs.find((dog) => dog.name.toLowerCase() === name.toLowerCase());

  return (
    <div className="DogDetails">
      <img src={dog.src} alt={dog.name} />
      <h2>{dog.name}</h2>
      <h3>{dog.age} years old</h3>
      <ul>
        {dog.facts.map((fact, i) => (
          <li key={i}>{fact}</li>
        ))}
      </ul>
      <Link to="/dogs">Go Back</Link>
    </div>
  );
}

export default DogDetails;
