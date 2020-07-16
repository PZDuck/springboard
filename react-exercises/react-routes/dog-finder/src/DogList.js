import React from "react";
import { Link } from "react-router-dom";
import "./DogList.css";

function DogList({ dogs }) {
  return (
    <div className="DogList">
      {dogs.map((dog) => (
        <div className="dog-info" key={dog.name}>
          <Link to={`/dogs/${dog.name.toLowerCase()}`}>
            <img src={dog.src} alt={dog.name} />
            <span>{dog.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default DogList;
