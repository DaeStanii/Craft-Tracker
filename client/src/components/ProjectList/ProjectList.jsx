import { Link } from "react-router-dom";

const ProjectList = ({ projects, title, showTitle = true }) => {
  if (!projects.length) {
    return <h3>No Projects Yet!</h3>;
  } 

  return (
    <div className="relative">
      <div className="w-2/5">
      {showTitle && <h3 className="text-xl absolute inset-x-0 -top-20">{title}</h3>}
      </div>
      <div  className="grid grid-rows-3 grid-flow-col gap-4 mt-2">
      {projects &&
        projects.map((project) => (
          <div  className="border-2 border-black rounded-xl" key={project._id}>
            <h3 className="border-dashed border-b-2 border-black text-md">{project.projectType}</h3>
            <h3 className="border-dotted border-b border-black text-lg">{project.projectTitle}</h3>
            <p className="border-dotted border-b border-black text-xs">Created On: {project.createdAt}
            </p>
            <p className="border-dotted border-b border-black text-sm">
             by {project.projectAuthor}</p>
            <Link to={`/projects/${project._id}`}>View Materials & Comments</Link>
          </div>
        ))}
        </div>
    </div>
  );
};

export default ProjectList;
