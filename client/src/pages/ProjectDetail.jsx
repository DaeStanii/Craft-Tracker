import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import Auth from "../utils/auth";

import MaterialForm from "../components/MaterialForm/MaterialForm";
import MaterialList from "../components/MaterialList/MaterialList";
import CommentList from "../components/CommentList/CommentList";
import CommentForm from "../components/CommentForm/CommentForm";

import { QUERY_SINGLE_PROJECT } from "../utils/queries";

const ProjectDetail = () => {

  const [showMaterial, setShowMaterial] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const toggleShowMaterial = () => {
    setShowMaterial((showMaterial) => !showMaterial)
  };

  const toggleShowComment = () => {
    setShowComment((showComment) => !showComment)
  }

  const { projectId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId },
  });

  const project = data?.project || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="text-center">
      <div>
        <h2>{project.projectType}</h2>
        <h2>{project.projectTitle}</h2>
        <h3>Crafted by: {project.projectAuthor}</h3>
        <h4>Created on: {project.createdAt}</h4>
      </div>
      <div>
        <MaterialList materials={project.materials} />
      </div>
      {Auth.getProfile().data.username === project.projectAuthor && (
        <div>
          <button onClick={toggleShowMaterial}>Add Material</button>
          { showMaterial && <MaterialForm projectId={project._id} /> }
        </div>
      )}
      <div>
        <CommentList comments={project.comments} />
      </div>
      <div>
        <button onClick={toggleShowComment}>Add Comment</button>
        { showComment && <CommentForm projectId={project._id} /> }
      </div>
    </div>
  );
};

export default ProjectDetail;
