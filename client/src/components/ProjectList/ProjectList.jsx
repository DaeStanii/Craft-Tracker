import { Link } from "react-router-dom";

const ProjectList = ({ projects }) => {
  if (!projects) {
    return <h3>No Projects Yet!</h3>;
  }

  return (
    <div>
      {projects &&
        projects.map((project) => (
          <div key={project._id}>
            <h3>{project.projectTitle}</h3>
            <p>Created On: {project.createdOn}</p>
            <Link to={`/projects/${project._id}`}>Add or view Materials</Link>
          </div>
        ))}
      <p>Project List</p>
    </div>
  );
};

export default ProjectList;
