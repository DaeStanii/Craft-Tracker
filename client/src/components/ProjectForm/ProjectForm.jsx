import { useMutation } from "@apollo/client";
import { useState } from "react";

import { ADD_PROJECT } from "../../utils/mutations";
import { QUERY_PROJECTS, QUERY_ME } from "../../utils/queries";

import plus from "../../public/plus.png";

const ProjectForm = () => {
  const [formState, setFormState] = useState({
    projectType: "",
    projectTitle: "",
  });

//   const [showOption, setShowOption] = useState(false);

  const [addProject, { error }] = useMutation(ADD_PROJECT, {
    refetchQueries: [QUERY_PROJECTS, "getProjects", QUERY_ME, "me"],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    // if (event.target.value === "Other") {
    //     setShowOption(true)
    // } else {
    //     setShowOption(false)
    // }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = await addProject({
        variables: { ...formState },
      });
    } catch (err) {
      console.log(err);
    }

    setFormState({
      projectType: "",
      projectTitle: "",
    });

    alert("Craft created!")
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>Choose your Project Type</label>
        <select
          name="projectType"
          onChange={handleChange}
          value={formState.projectType}
        >
            <option>     </option>
            <option value="Knitting">Knitting</option>
            <option value="Crocheting">Crocheting</option>
            <option value="Painting">Painting</option>
            <option value="Embroidery">Embroidery</option>
            <option value="Other">Other</option>
        </select>

        {/* {showOption && 
        <input 
        name="projectType"
        onChange={handleChange}
        value={formState.projectType}
        type="text"
        placeholder="Type of Project"
        />
        } */}

        <input
          name="projectTitle"
          onChange={handleChange}
          value={formState.projectTitle}
          type="text"
          placeholder="Your Project Title"
        ></input>
        <button type="submit">
          <img src={plus} className="w-6" />
        </button>
        {error && <div>{error.message}</div>}
      </form>
    </div>
  );
};

export default ProjectForm;
