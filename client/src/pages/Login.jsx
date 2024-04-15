import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { Link } from "react-router-dom";
// import easel from "../images/easel.png"

import Auth from "../utils/auth";

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
      <div className="container w-1/2 max-w-96">
        <div
          style={{
            height: "30vh",
            width: "100%",
          }}
          className="p-5 bg-[#cb9eca] min-h-52 object-fill shadow-2xl border-2 border-[#272443] backdrop-blur-md rounded-md"
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
                  className="grid justify-items-center object-fill"
                  onSubmit={handleFormSubmit}
                >
                  <input
                    placeholder="Your email"
                    name="email"
                    type="email"
                    className="mb-1 rounded-sm"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <input
                    placeholder="******"
                    name="password"
                    type="password"
                    className="mb-1 rounded-sm"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <button
                    style={{ cursor: "pointer" }}
                    className="rounded-lg my-2 bg-[#9c4988] text-center text-[#f3f0f1] border border-[#272443] p-1 rounded"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
                <div className="text-center my-1 rounded-md">
                  <a href="/signup">Sign up here!</a>
                </div>
                {/* <img src={easel}/> */}
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
