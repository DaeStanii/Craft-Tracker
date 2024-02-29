import { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";
import backgroundImage from "../images/scribble.png";

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
          height: "30vh",
          width: "100%",
        }}
        className="p-5 object-fill bg-transparent shadow-2xl border-2 border-black/50 backdrop-blur-md rounded-md"
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
                    className="mb-1 rounded-sm"
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    />
                  <input
                    className="mb-1 rounded-sm"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    />
                  <input
                    className="mb-1 rounded-sm"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <button
                    style={{ cursor: "pointer" }}
                    className="rounded-lg my-2 text-center border border-black p-1 rounded bg-gradient-to-t from-violet-300/80 to-blue-300/80"
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
