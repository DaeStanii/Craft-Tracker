import { Link } from "react-router-dom";

const ProjectList = ({ projects, title, showTitle = true }) => {
  if (!projects.length) {
    return <h3>No Projects Yet!</h3>;
  } 

  return (
    <div className="relative">
      <div>
      {showTitle && <h3 className="text-xl">{title}</h3>}
      </div>
      <div className="w-full m-2 grid grid-flow-row-dense grid-cols-3 auto-rows-auto gap-3">
      {projects &&
        projects.map((project) => (
          <div className="container bg-[#cb9eca] dark:text-[#f3f0f1] rounded-md backdrop-blur-sm max-w-72 mt-3 shadow-md" key={project._id}>
            <h3 className="text-md">{project.projectType}</h3>
            <h2 className="text-lg">{project.projectTitle}</h2>
            <p className="text-sm">
             by {project.projectAuthor}</p>
            <Link to={`/projects/${project._id}`}>View Materials & Comments</Link>
          </div>
        ))}
        </div>
    </div>
  );
};

export default ProjectList;
