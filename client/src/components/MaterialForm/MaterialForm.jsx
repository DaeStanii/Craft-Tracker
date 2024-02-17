import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_MATERIAL } from "../../utils/mutations";

import plus from "../../public/plus.png";

const MaterialForm = () => {

  const [formState, setFormState] = useState({ materialLabel: "", materialDetail: ""});
  const [addMaterial, { error }] = useMutation(ADD_MATERIAL)

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addMaterial({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e)
    }

    setFormState({
      materialLabel: "",
      materialDetail: "",
    })

  };

  

  return (
      <form
        className="grid justify-items-center"
        onSubmit={handleFormSubmit}
      >
        <input
        value={formState.materialLabel}
        onChange={handleChange} 
        placeholder="Your Material Brand" 
        name="materialLabel"
        type="text"
        />
        <input 
        value={formState.materialDetail}
        onChange={handleChange}
        placeholder="Your Material" 
        name="materialDetail"
        type="text"
        />
        <button type="submit">
          <img src={plus} className="w-7"></img>
        </button>
      </form>
  );
};

export default MaterialForm;
