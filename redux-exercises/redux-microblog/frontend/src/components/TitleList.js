import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTitlesFromAPI } from "../actions/titles";
import { Link } from "react-router-dom";
import { sendVoteToAPI } from "../actions/posts";

function TitleList() {
  const titles = useSelector((st) => st.titles);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      async function fetchTitle() {
        await dispatch(fetchTitlesFromAPI());
        setIsLoading(false);
      }

      if (isLoading) {
        fetchTitle();
      }
    },
    [dispatch, isLoading]
  );

  function vote(direction, id) {
    dispatch(sendVoteToAPI(id, direction));
  }

  if (isLoading)
    return (
      <div className="fa-3x">
        <i className="fas fa-spinner fa-pulse"></i>
      </div>
    );

  if (!isLoading && titles.length === 0) {
    return <b>No Posts</b>;
  }

  return (
    <div className="row">
      {titles.map((title) => (
        <div key={title.id} className="col">
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <Link to={"/" + title.id}>{title.title}</Link>
              </div>
              <div className="card-text">
                <i>{title.description}</i>
              </div>
            </div>
            <div className="card-footer">
              <small>{title.votes} votes</small>
              <i
                className="fas fa-thumbs-up text-success ml-2"
                onClick={() => vote("up", title.id)}
              />
              <i
                className="fas fa-thumbs-down text-danger ml-2"
                onClick={() => vote("down", title.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TitleList;
