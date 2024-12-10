import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidaData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_URL, USER_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };


  const handleButtonClick = () => {
    // Validate the form data
    console.log("Email", email.current.value);
    console.log("Password", password.current.value);
    const msg = checkValidaData(email.current.value, password.current.value);
    setErrorMessage(msg);

    if (msg) return;

    // Sign In or Sign Up
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
      .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // Updating User Profile
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_URL,
          })
          .then(() => {
            // Profile updated!
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL
              }));
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
            // navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(user, {
            displayName: user.displayName,
            photoURL: {USER_URL},
          })
            .then(() => {
              // Profile updated!
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + errorMessage);
        });
    }
  };

  return (
    <div className="login">
      <Header />
      <img
        className="absolute"
        src={BACKGROUND_URL}
        alt="logo"
      />

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 bg-black w-3/12 my-40 mx-auto right-0 left-0 text-white opacity-85 rounded-md"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-800 rounded-sm"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-800 rounded-sm"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-800 rounded-sm"
        />
        <p className="py-4 text-red-600 font-bold text-lg">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-sm"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New To Netflix? Sign Up Now"
            : "Already A User Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
