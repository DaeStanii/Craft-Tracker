import { useMutation } from "@apollo/client";

import { REMOVE_COMMENT } from "../../utils/mutations";
import { QUERY_PROJECTS } from "../../utils/queries";

import Auth from "../../utils/auth";
import deleteIcon from "../../images/delete.png"; 


const CommentList = ({ comments = [], project = [] }) => {

        // Remove material query
        const [removeComment, { error }] = useMutation(REMOVE_COMMENT, {
            refetchQueries: [QUERY_PROJECTS, "getProjects"],
          });
    
    if (!comments.length) {
        return <h4>No Comments Yet</h4>
    }
    
    return (
        <>
            <h2 className="py-1 text-lg border-dashed border-b-2 border-black">Comments:</h2>

            <div>
                {comments &&
                    comments.map((comment) => (
                        <div key={comment._id}>
                            <h4 className="border-dotted border-b border-black text-md py-1">
                                {comment.commentAuthor} commented on {comment.createdAt}
                            </h4>
                            <p className="border-solid text-lg py-1">{comment.commentText}</p>
                            {Auth.loggedIn() &&
                Auth.getProfile().data.username === comment.commentAuthor && (
                  <div className="border-b border-black">

                  <button
                    onClick={async (event) => {
                      event.preventDefault();
                      try {
                        const { data } = await removeComment({
                          variables: {
                            projectId: project._id,
                            commentId: comment._id,
                          },
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    >
                      <img src={deleteIcon} className="w-5" />
                  </button>
                    </div>
                )}
                {error && <p>{error.message}</p>}

                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default CommentList;