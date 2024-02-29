import { useMutation } from "@apollo/client";
import { useState } from "react";

import { ADD_PROJECT } from "../../utils/mutations";
import { QUERY_PROJECTS, QUERY_ME } from "../../utils/queries";

import plus from "../../images/plus.png";

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

      console.log(data);

    } catch (err) {
      console.log(err);
    }

    setFormState({
      projectType: "",
      projectTitle: "",
    });
  };

  return (
    <section className="flex items-center justify-center text-center">
      <div className="container w-2/5 backdrop-blur-sm rounded-lg p-3 border-2 border-black shadow-lg">

      <form onSubmit={handleFormSubmit}
       className="grid justify-items-center object-fill"
      >
        <label className="text-lg">Choose your Project Type</label>
        <select
        className="mt-2"
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

        <input
          name="projectTitle"
          onChange={handleChange}
          className="my-1"
          value={formState.projectTitle}
          type="text"
          placeholder="Your Project Title"
          ></input>
        <button type="submit" className="mt-2">
          <img src={plus} className="w-6" />
        </button>
        {error && <div>{error.message}</div>}
      </form>
          </div>
    </section>
  );
};

export default ProjectForm;
