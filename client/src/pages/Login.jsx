import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { Link } from "react-router-dom";

import Auth from "../utils/auth";
import backgroundImage from "../../public/scribble.png";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main className="flex justify-center items-center mt-5">
      {/* TODO fix full screen display */}
      <div className="container w-1/2">
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            height: "30vh",
            width: "100%",
          }}
          className="p-5 object-fill ring ring-cyan-100 rounded-md border-2 border-cyan-400 bg-sky-700/80 shadow-lg"
        >
          <h4 className="text-xl font-bold text-center mb-2">Login</h4>
          <div>
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <>
                <form
                  className="grid justify-items-center"
                  onSubmit={handleFormSubmit}
                >
                  <input
                    placeholder="Your email"
                    name="email"
                    type="email"
                    className="mb-1"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <input
                    placeholder="******"
                    name="password"
                    type="password"
                    className="mb-1"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <button
                    style={{ cursor: "pointer" }}
                    className="rounded-lg mb-1 border border-cyan-500 bg-cyan-200 text-md p-2 text-center hover:bg-cyan-300"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
                <div className="text-center bg-cyan-200/60 rounded-md">
                  <a href="/signup">Dont have an account? Sign up here!</a>
                </div>
              </>
            )}

            {error && <div>{error.message}</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
