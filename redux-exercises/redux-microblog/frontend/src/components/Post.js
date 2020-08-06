import React, { useEffect, useState } from "react";
import "./Post.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  getPostFromAPI,
  updatePostInAPI,
  sendVoteToAPI,
  sendCommentToAPI,
  removeCommentFromAPI,
  removePostFromAPI,
} from "../actions/posts";
import PostForm from "../components/PostForm";
import CommentList from "../components/CommentList";
import PostDisplay from "../components/PostDisplay";
import CommentForm from "../components/CommentForm";

function Post(props) {
  const [isEditing, setIsEditing] = useState(false);
  const postId = Number(useParams().postId);
  const history = useHistory();
  const post = useSelector((st) => st.posts[postId]);
  const dispatch = useDispatch();

  useEffect(
    function loadPostWhenPostOrIdChanges() {
      async function getPost() {
        dispatch(getPostFromAPI(postId));
      }
      if (!post) {
        getPost();
      }
    },
    [dispatch, postId, post]
  );

  function toggleEdit() {
    setIsEditing((edit) => !edit);
  }

  function edit({ title, description, body }) {
    dispatch(updatePostInAPI(postId, title, description, body));

    toggleEdit();
  }

  function deletePost() {
    dispatch(removePostFromAPI(postId));
    history.push("/");
  }

  function vote(direction) {
    dispatch(sendVoteToAPI(postId, direction));
  }

  function addComment(text) {
    dispatch(sendCommentToAPI(postId, text));
  }

  function deleteComment(commentId) {
    dispatch(removeCommentFromAPI(postId, commentId));
  }

  if (!post)
    return (
      <div className="fa-3x">
        <i className="fas fa-spinner fa-pulse"></i>
      </div>
    );

  return (
    <div className="Post">
      {isEditing ? (
        <PostForm post={post} save={edit} cancel={toggleEdit} />
      ) : (
        <PostDisplay
          post={post}
          toggleEdit={toggleEdit}
          deletePost={deletePost}
          doVote={vote}
        />
      )}

      <section className="Post-comments mb-4">
        <h4>Comments</h4>
        <CommentList comments={post.comments} deleteComment={deleteComment} />
        <CommentForm submitCommentForm={addComment} />
      </section>
    </div>
  );
}

export default Post;
