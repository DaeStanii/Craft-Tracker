import { useMutation } from "@apollo/client";
import { useState } from "react";

import { ADD_PROJECT } from "../../utils/mutations";
import { QUERY_PROJECTS, QUERY_ME } from "../../utils/queries";

import plus from "../../public/plus.png"

const ProjectForm = () => {

    const [formState, setFormState] = useState({ projectTitle: "" });

    const [addProject, { error }] = useMutation(ADD_PROJECT, {
        refetchQueries: [
            QUERY_PROJECTS,
            "getProjects",
            QUERY_ME,
            "me"
        ]
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        })

    }

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
            projectTitle: ""
        })
    };

    return (
        <div>
            <form
            onSubmit={handleFormSubmit}
            >
                <input 
                name="projectTitle"
                onChange={handleChange}
                value={formState.projectTitle}
                type="text"
                placeholder="Your Project Title"
                ></input>
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