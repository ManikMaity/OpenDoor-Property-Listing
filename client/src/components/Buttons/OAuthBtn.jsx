import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../../firebase.js";
import { set } from "mongoose";
import SmallCircleLoader from "../Loaders/SmallCircleLoader.jsx";
import useUserStore from "../../store/userStore.js";
import { useNavigate } from "react-router-dom";

function OAuthBtn() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useUserStore();
  const navigator = useNavigate();

  async function handleGoogleClick() {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = result.user;
      const data = JSON.stringify({
        username: displayName,
        email,
        profileImage: photoURL,
      });

      const response = await fetch(`/api/auth/google`, {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resultData = await response.json();
      if (resultData.success === false) {
        setError(resultData.message);
        console.log(error);
      } else {
        setUser(resultData);
        navigator("/");
      }
    } catch (err) {
      setError(err.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={() => handleGoogleClick()}
      className="w-full flex items-center justify-center px-4 py-2 mt-2 text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
    >
      {isLoading ? (
        <SmallCircleLoader />
      ) : (
        <div className="flex items-center justify-center">
          <FaGoogle className="mr-2" />
          Continue with Google
        </div>
      )}
    </button>
  );
}

export default OAuthBtn;
