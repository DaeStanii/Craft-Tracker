import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_MATERIAL } from "../../utils/mutations";

import plus from "../../public/plus.png";

const MaterialForm = ({ projectId }) => {

  const [materialLabel, setMaterialLabel] = useState("");
  const [materialDetail, setMaterialDetail] = useState("");
  const [addMaterial, { error }] = useMutation(ADD_MATERIAL)

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addMaterial({
        variables: {
          projectId,
          materialLabel,
          materialDetail,
        },
      });
      console.log(data)

      setMaterialLabel("");
      setMaterialDetail("");
    } catch (e) {
      console.error(e)
    }
    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "materialLabel") {

      setMaterialLabel(value);
    } else if (name === "materialDetail") {

      setMaterialDetail(value)
    }
  };

  return (
      <form
        className="grid justify-items-center"
        onSubmit={handleFormSubmit}
      >
        { error && <p>{error.message}</p> }
        <input
        value={materialLabel}
        onChange={handleChange} 
        placeholder="Your Material Brand" 
        name="materialLabel"
        type="text"
        />
        <input 
        value={materialDetail}
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
