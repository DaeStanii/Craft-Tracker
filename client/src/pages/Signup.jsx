import { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";
import backgroundImage from "../../public/scribble.png";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex justify-center items-center mt-5">
      {/* TODO fix full screen view */}
      <div className="container w-1/2">

      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: "30vh",
          width: "100%",
        }}
        className="p-5 shadow-lg object-fill ring ring-cyan-100 rounded-md border-2 border-cyan-400"
        >
        <div>
          <h4 className="text-xl font-bold text-center mb-2">Sign Up</h4>
          <div>
            {data ? (
              <p>
                Success! You may now head <Link to="/">to the homepage.</Link>
              </p>
            ) : (
              <>
                <form
                  className="grid justify-items-center"
                  onSubmit={handleFormSubmit}
                  >
                  <input
                    className="mb-1"
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    />
                  <input
                    className="mb-1"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    />
                  <input
                    className="mb-1"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <button
                    style={{ cursor: "pointer" }}
                    className="rounded-lg border border-cyan-500 bg-cyan-200 text-md p-2 text-center hover:bg-cyan-300"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </>
            )}

            {error && <div>{error.message}</div>}
          </div>
        </div>
      </div>
                    </div>
    </main>
  );
};

export default Signup;
