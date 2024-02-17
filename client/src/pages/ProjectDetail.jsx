import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";

import MaterialForm from "../components/MaterialForm/MaterialForm";
import MaterialList from "../components/MaterialList/MaterialList";
import CommentList from "../components/CommentList/CommentList";
import CommentForm from "../components/CommentForm/CommentForm";

import { QUERY_SINGLE_PROJECT } from "../utils/queries";

const ProjectDetail = () => {
  const { projectId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId },
  });

  const project = data?.project || {};

  console.log(Auth.getProfile().data.username, project.projectAuthor)

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <h2>{project.projectTitle}</h2>
        <h3>Crafted by: {project.projectAuthor}</h3>
        <h4>Created on: {project.createdAt}</h4>
      </div>
      <div>
        <MaterialList materials={project.materials} />
      </div>
      {Auth.getProfile().data.username === project.projectAuthor && (
        <div>
          <MaterialForm projectId={project._id} />
        </div>
      )}
      <div>
        <CommentList comments={project.comments} />
      </div>
      <div>
        <CommentForm projectId={project._id} />
      </div>
    </div>
  );
};

export default ProjectDetail;
