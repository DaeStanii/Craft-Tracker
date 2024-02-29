import { Link } from "react-router-dom"
import Auth from "../../utils/auth";

const UserProjects = ({ projects }) => {

    if (!projects.length) {
        return <p>No projects yet!</p>
    }

    return (
        <div className="relative">
        <div className="columns-1 mt-2">
        {projects &&
        projects.filter( project => {
            return (
                project.projectAuthor === Auth.getProfile().data.username
            )
        })
          .map((project) => (
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
    )

}

export default UserProjects;