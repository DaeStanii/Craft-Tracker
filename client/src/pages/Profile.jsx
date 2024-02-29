import { useState } from "react";
import { useQuery } from "@apollo/client";

import { QUERY_PROJECTS } from "../utils/queries";

import Auth from "../utils/auth";
import Create from "../images/create.png";
import ProjectForm from "../components/ProjectForm/ProjectForm";
import UserProjects from "../components/UserProjects/UserProjects";

const Profile = () => {
  const [showCreate, setShowCreate] = useState(false);

  const createCraft = () => {
    setShowCreate((showCreate) => !showCreate);
  };

  const { loading, data } = useQuery(QUERY_PROJECTS);
  const projects = data?.projects || [];

  return (
    <div className="relative text-center">
      <h3 className="text-xl absolute inset-x-0 -top-12">
        Welcome to your profile, {Auth.getProfile().data.username}!
      </h3>

      <section className="mt-3 pt-4">
        <button onClick={createCraft}>
          <img src={Create} className="rounded-full w-7" />
        </button>
        {showCreate && <ProjectForm />}
      </section>

      {loading ? (
        <p>Loading your projects...</p>
      ) : (
        <section>
          <UserProjects
          projects={projects}
          />
        </section>
      )}
    </div>
  );
};

export default Profile;
