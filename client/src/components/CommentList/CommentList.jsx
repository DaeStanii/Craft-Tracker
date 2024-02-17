const CommentList = ({ comments = [] }) => {
    
    if (!comments.length) {
        return <h4>No Comments Yet</h4>
    }
    
    return (
        <>
            <h2>Comments:</h2>

            <div>
                {comments &&
                    comments.map((comment) => (
                        <div className="border-2" key={comment._id}>
                            <h4>
                                {comment.commentAuthor} commented on {comment.createdAt}
                            </h4>
                            <p>{comment.commentText}</p>

                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default CommentList;