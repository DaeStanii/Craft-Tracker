import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_MATERIAL } from "../../utils/mutations";

import Auth from "../../utils/auth";
import plus from "../../images/plus.png";

const MaterialForm = ({ projectId, projectAuthor }) => {
  const [showMaterial, setShowMaterial] = useState(false);

  const [materialLabel, setMaterialLabel] = useState("");
  const [materialDetail, setMaterialDetail] = useState("");
  const [addMaterial, { error }] = useMutation(ADD_MATERIAL);

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
      console.log(data);

      setMaterialLabel("");
      setMaterialDetail("");
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "materialLabel") {
      setMaterialLabel(value);
    } else if (name === "materialDetail") {
      setMaterialDetail(value);
    }
  };

  const toggleShowMaterial = () => {
    setShowMaterial((showMaterial) => !showMaterial);
  };

  return (
    <>
      {Auth.loggedIn() && Auth.getProfile().data.username === projectAuthor && (
        <section>
          <div className="my-2">
            <button className="border border-black p-1 rounded bg-gradient-to-t from-violet-300/80 to-blue-300/80" onClick={toggleShowMaterial}>Add Material</button>
          </div>

          {showMaterial && (
            <form
              className="grid justify-items-center"
              onSubmit={handleFormSubmit}
            >
              {error && <p>{error.message}</p>}
              <input
                value={materialLabel}
                onChange={handleChange}
                className="my-2"
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
              <button type="submit" className="my-3">
                <img src={plus} className="w-7"></img>
              </button>
            </form>
          )}
        </section>
      )}
    </>
  );
};

export default MaterialForm;
