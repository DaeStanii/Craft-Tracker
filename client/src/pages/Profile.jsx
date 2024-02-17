import { useState } from "react";

import Auth from "../utils/auth";
import Create from "../public/create.png";
import ProjectForm from "../components/ProjectForm/ProjectForm";

const Profile = () => {
  const [showCreate, setShowCreate] = useState(false);

  const createCraft = () => {
    setShowCreate((showCreate) => !showCreate);
  };

  return (
    <div className="text-center">
      <h3>Welcome to your profile, {Auth.getProfile().data.username}!</h3>

      <section>
        <button onClick={createCraft}>
          <img src={Create} className="rounded-full w-7" />
        </button>
        {showCreate && <ProjectForm />}
      </section>
    </div>
  );
};

export default Profile;
