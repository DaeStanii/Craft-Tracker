import { useMutation } from "@apollo/client";

import { REMOVE_MATERIAL } from "../../utils/mutations";
import { QUERY_PROJECTS } from "../../utils/queries";

import Auth from "../../utils/auth";
import deleteIcon from "../../images/delete.png";

const MaterialList = ({ materials = [], project = [] }) => {
  // Remove material query
  const [removeMaterial, { error }] = useMutation(REMOVE_MATERIAL, {
    refetchQueries: [QUERY_PROJECTS, "getProjects"],
  });

  if (!materials.length) {
    return <h4>No Materials Added</h4>;
  }

  return (
    <div>
      <h2 className="text-lg border-dashed border-b-2 border-black dark:border-white py-1">
        Materials:
      </h2>
      <div>
        {materials &&
          materials.map((material) => (
            <div key={material._id}>
              <h4 className="border-dotted border-b border-black dark:border-white py-1">
                {material.materialLabel}
              </h4>
              <h5 className="border-solid py-1">{material.materialDetail}</h5>
              {Auth.loggedIn() &&
                Auth.getProfile().data.username === project.projectAuthor && (
                  <div className="border-b border-black dark:border-white">

                  <button
                    onClick={async (event) => {
                      event.preventDefault();
                      try {
                        const { data } = await removeMaterial({
                          variables: {
                            projectId: project._id,
                            materialId: material._id,
                          },
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <img src={deleteIcon} className="w-5" />
                  </button>
                          </div>
                )}
              {error && <p>{error.message}</p>}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MaterialList;
