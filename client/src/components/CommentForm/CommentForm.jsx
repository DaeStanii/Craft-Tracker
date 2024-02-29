import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_COMMENT } from "../../utils/mutations";

import Auth from "../../utils/auth";
import plus from "../../images/plus.png";

const CommentForm = ({ projectId }) => {
  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          projectId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "commentText" && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <p className="my-2"> Character Count: {characterCount}/280</p>
          {error && <p>{error.message}</p>}

          <form onSubmit={handleFormSubmit}>
            <div>
              <textarea
                name="commentText"
                placeholder="Add your comment"
                value={commentText}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <button type="submit" className="my-3">
                <img 
                    src={plus}
                    className="w-7"
                />
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>You need to be logged in to comment on this!</p>
      )}
    </div>
  );
};

export default CommentForm;
