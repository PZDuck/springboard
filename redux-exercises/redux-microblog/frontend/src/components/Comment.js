import React from "react";

function Comment({ deleteComment, text, id }) {
  function handleDelete() {
    deleteComment(id);
  }

  return (
    <div>
      <p>
        <i className="fa fa-comment mr-2" />
        {text}
        {deleteComment && (
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </p>
    </div>
  );
}

export default Comment;
