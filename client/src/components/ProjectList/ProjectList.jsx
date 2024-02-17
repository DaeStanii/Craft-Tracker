import { Link } from "react-router-dom";

const ProjectList = ({ projects, title, showTitle = true }) => {
  if (!projects.length) {
    return <h3>No Projects Yet!</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {projects &&
        projects.map((project) => (
          <div  className="border-2" key={project._id}>
            <h3>{project.projectTitle}</h3>
            <p>Created On: {project.createdAt} by {project.projectAuthor}</p>
            <Link to={`/projects/${project._id}`}>View Materials & Comments</Link>
          </div>
        ))}
    </div>
  );
};

export default ProjectList;
