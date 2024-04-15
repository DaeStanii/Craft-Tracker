import { Link } from "react-router-dom"
import Auth from "../../utils/auth";

const UserProjects = ({ projects }) => {

    if (!projects.length) {
        return <p>No projects yet!</p>
    }

    return (
        <div className="flex">
        <div className="w-full m-2 grid grid-flow-row-dense grid-cols-3 auto-rows-auto gap-3">
        {projects &&
        projects.filter( project => {
            return (
                project.projectAuthor === Auth.getProfile().data.username
            )
        })
          .map((project) => (
            <div  className="container bg-[#cb9eca] dark:text-[#f3f0f1] rounded-md backdrop-blur-sm max-w-72 mt-3 shadow-md" key={project._id}>
              <h3 className="text-md">{project.projectType}</h3>
              <h2 className="text-lg">{project.projectTitle}</h2>
              <p className="text-sm">
               by {project.projectAuthor}</p>
              <Link to={`/projects/${project._id}`}>View Materials & Comments</Link>
            </div>
          ))}
          </div>
      </div>
    )

}

export default UserProjects;