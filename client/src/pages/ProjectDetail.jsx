import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import Auth from "../utils/auth";
import deleteIcon from "../images/delete.png";

import MaterialForm from "../components/MaterialForm/MaterialForm";
import MaterialList from "../components/MaterialList/MaterialList";

import CommentList from "../components/CommentList/CommentList";
import CommentForm from "../components/CommentForm/CommentForm";

import { QUERY_SINGLE_PROJECT } from "../utils/queries";
import { REMOVE_PROJECT } from "../utils/mutations";
import { QUERY_PROJECTS } from "../utils/queries";

const ProjectDetail = () => {
  const [removeProject, { error }] = useMutation(REMOVE_PROJECT, {
    refetchQueries: [QUERY_PROJECTS, "getProjects"],
  });
  
  // Toggle display functions
  const [showComment, setShowComment] = useState(false);

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

  // Delete projects
  const handleRemoveSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await removeProject({
        variables: {
          projectId: project._id,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="flex items-center justify-center mt-7">
      <div className="w-1/2 max-w-96 text-center">
        <section className="rounded-md bg-[#cb9eca] backdrop-blur-sm">
          <p className="text-lg">
            {project.projectType}
          </p>
          <p className="text-xl">
            {project.projectTitle}
          </p>
          <p className="text-lg">Crafted by: {project.projectAuthor}</p>
          <p className="text-sm">
            On {project.createdAt}
          </p>
        </section>
        <section className="mt-2 rounded-md bg-[#9c82c0] backdrop-blur-sm">
          <div>
            <MaterialList materials={project.materials} project={project} />
          </div>
          <div>
            <MaterialForm
              projectId={project._id}
              projectAuthor={project.projectAuthor}
            />
          </div>
        </section>

        <section className="mt-2 rounded-md bg-[#9c82c0] backdrop-blur-sm">
          <div>
            <CommentList comments={project.comments} project={project} />
          </div>
          <div>
            <button className="my-2 p-1 bg-[#cb9eca] rounded border border-[#272443] dark:border-[#f3f0f1] p-1 rounded" onClick={toggleShowComment}>Add Comment</button>
            {showComment && <CommentForm projectId={project._id} />}
          </div>
        </section>
        {error && <div>{error.message}</div>}
      </div>
      {Auth.loggedIn() &&
        Auth.getProfile().data.username === project.projectAuthor && (
          <button className="p-3" onClick={handleRemoveSubmit}>
            <Link to="/me">
              <img src={deleteIcon} className="w-6 dark:invert" />
            </Link>
          </button>
        )}
    </main>
  );
};

export default ProjectDetail;
