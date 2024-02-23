const CommentList = ({ comments = [] }) => {
    
    if (!comments.length) {
        return <h4>No Comments Yet</h4>
    }
    
    return (
        <>
            <h2 className="text-lg border-dashed border-b-2 border-black">Comments:</h2>

            <div>
                {comments &&
                    comments.map((comment) => (
                        <div className="border-2" key={comment._id}>
                            <h4 className="border-dotted border-b border-black text-md">
                                {comment.commentAuthor} commented on {comment.createdAt}
                            </h4>
                            <p className="border-solid border-b border-black text-lg">{comment.commentText}</p>

                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default CommentList;