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
  // Toggle display functions

  const [showMaterial, setShowMaterial] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const toggleShowMaterial = () => {
    setShowMaterial((showMaterial) => !showMaterial);
  };

  const toggleShowComment = () => {
    setShowComment((showComment) => !showComment);
  };

  // Query projects

  const { projectId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId },
  });

  const project = data?.project || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex items-center justify-center">
      <div className="w-1/2 text-center">
        <section className=" border-2 border-black rounded-xl">
          <p className="text-lg border-dashed border-b-2 border-black">{project.projectType}</p>
          <p className="text-xl border-dotted border-b border-black">{project.projectTitle}</p>
          <p className="text-lg">Crafted by: {project.projectAuthor}</p>
          <p className="text-sm border-dotted border-b border-black">On {project.createdAt}</p>
        </section>
        <section className="mt-2 border-2 border-black rounded-xl">
          <div>
            <MaterialList materials={project.materials} />
          </div>
          {Auth.getProfile().data.username === project.projectAuthor && (
            <div className="border-b border-black">
              <button onClick={toggleShowMaterial}>Add Material</button>
              {showMaterial && <MaterialForm projectId={project._id} />}
            </div>
          )}
        </section>

        <section className="mt-2 border-2 border-black rounded-xl">
          <div>
            <CommentList comments={project.comments} />
          </div>
          <div>
            <button onClick={toggleShowComment}>Add Comment</button>
            {showComment && <CommentForm projectId={project._id} />}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProjectDetail;
