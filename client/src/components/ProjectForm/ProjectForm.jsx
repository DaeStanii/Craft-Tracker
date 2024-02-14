import { useMutation } from "@apollo/client";
import { useState } from "react";

import { ADD_PROJECT } from "../../utils/mutations";
import { QUERY_PROJECTS, QUERY_ME } from "../../utils/queries";

import plus from "../../public/plus.png"

const ProjectForm = () => {

    const [projectTitle, setProjectTitle] = useState("");

    const [addProject, { error }] = useMutation(ADD_PROJECT, {
        refetchQueries: [
            QUERY_PROJECTS,
            "getProjects",
            QUERY_ME,
            "me"
        ]
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            // eslint-disable-next-line no-unused-vars
            const { data } = await addProject({
                variables: {
                    projectTitle,
                },
            });
            setProjectTitle("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <form
            onSubmit={handleFormSubmit}
            >
                <input 
                name="projectTitle"
                value={projectTitle}
                placeholder="Your Project Title"
                />
                <button
                type="submit"
                >
                    < img
                    src={plus}
                    className="w-6"
                    />
                </button>
                {error && (
                    <div>
                        {error.message}
                    </div>
                )}
            </form>

        </div>
    )
};

export default ProjectForm;