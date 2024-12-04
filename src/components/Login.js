import React, {useState} from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }

  return (
    <div className="login">
      <Header />
      <img
        className="absolute"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/2bcf01ee-7ef6-4930-b0d5-c6863853c461/web/IN-en-20241125-TRIFECTA-perspective_a47db038-756f-4f26-b1f7-cfc882b98746_large.jpg"
        alt="logo"
      />

      <form className="absolute p-12 bg-black w-3/12 my-40 mx-auto right-0 left-0 text-white opacity-85 rounded-sm">
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && <input
          type="text"
          placeholder="Full Name"
          className="p-4 my-4 w-full bg-gray-800 rounded-sm"
        />}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-800 rounded-sm"
        />
        <input
          type="text"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-800 rounded-sm"
        />
        <button className="p-4 my-6 bg-red-700 w-full rounded-sm">
        {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4" onClick={toggleSignInForm}>{isSignInForm ? "New To Netflix? Sign Up Now" : "Already A User Sign In Now"}</p>
      </form>
    </div>
  );
};

export default Login;
