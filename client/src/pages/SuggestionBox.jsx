import { useState } from "react";
import { send } from "emailjs-com";

const SuggestionBox = () => {

    function validateEmail(email) {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    
      const [errorMessage, setErrorMessage] = useState("");
      const [successMessage, setSuccessMessage] = useState("");
      const [toSend, setToSend] = useState({
        from_name: "",
        reply_to: "",
        message: "",
      });
    
      const handleInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;
    
        setToSend({ ...toSend, [inputType]: inputValue });
      };
    
      const handleFormSubmit = (e) => {
        e.preventDefault();
    
        //  Setting error messages if no input value
        if (!validateEmail(toSend.reply_to)) {
          setErrorMessage("Email is invalid");
          return;
        }
        if (!toSend.from_name || !toSend.message) {
          setErrorMessage("You are missing a required field");
          return;
        }
    
        send("service_90uogfh", "template_75imtx9", toSend, "PiPlz6GHBdSn9SnTQ")
          .then((response) => {
            console.log(response);
            setSuccessMessage(
              "I have received your email successfully, I will get back to you soon."
            );
          })
          .catch((err) => {
            console.log(err);
          });
    
        // Setting input fields back to an empty string
        setToSend({
          from_name: "",
          reply_to: "",
          message: "",
        });
      };
    
      return (
        <main className="flex justify-center items-center text-center mt-9">
          <div className=" container w-3/4 max-w-md backdrop-blur-sm rounded-lg p-3 bg-[#cb9eca] shadow-lg">

          <h1 className="text-xl">Welcome to the Suggestion Box!</h1>
          <h2>Your feedback and ideas are always appreciated</h2>
          <form 
          className="grid justify-items-center"
          onSubmit={handleFormSubmit}>
            <input
              value={toSend.from_name}
              name="from_name"
              onChange={handleInputChange}
              className="mt-3 rounded-sm"
              type="text"
              placeholder="Your Name"
              />
            <input
              value={toSend.reply_to}
              name="reply_to"
              onChange={handleInputChange}
              className="mt-1 rounded-sm"
              type="email"
              placeholder="Email"
              />
            <textarea
              value={toSend.message}
              name="message"
              onChange={handleInputChange}
              className="mt-1 rounded-sm"
              type="text"
              placeholder="message"
              />
            <button type="submit" className="my-2 border dark:border-[#f3f0f1] border-[#272443] bg-[#9c82c0] p-1 rounded">Send</button>
          </form>
              </div>
          {errorMessage && (
            <div>
              <p>{errorMessage}</p>
            </div>
          )}
          {successMessage && (
            <div>
              <p>{successMessage}</p>
            </div>
          )}
        </main>
      );
    }
    
export default SuggestionBox;