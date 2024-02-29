import { Link } from "react-router-dom";

const ProjectList = ({ projects, title, showTitle = true }) => {
  if (!projects.length) {
    return <h3>No Projects Yet!</h3>;
  } 

  return (
    <div className="relative">
      <div>
      {showTitle && <h3 className="text-xl absolute inset-x-0 -top-20">{title}</h3>}
      </div>
      <div className="columns-1 mt-2">
      {projects &&
        projects.map((project) => (
          <div  className="container border-2 border-black rounded-xl backdrop-blur-sm w-1/2 mt-3 shadow-md" key={project._id}>
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
