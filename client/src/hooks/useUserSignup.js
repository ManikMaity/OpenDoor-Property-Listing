import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function useUserSignup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const navigator = useNavigate();

  function handlePasswordShow() {
    setShowPassword(!showPassword);
  }

  function resetAllData() {
    setUsername("");
    setPassword("");
    setEmail("");
    setShowPassword(false);
    setError("");
    setIsError(false);
  }

  async function handleSignup(e) {
    e.preventDefault();
    const data = {
      username,
      password,
      email,
    };
    const jsonData = JSON.stringify(data);

    setIsLoading(true);
    const response = await fetch(`/api/auth/signup`, {
      method: "POST",
      body: jsonData,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (result.success === false) {
      setError(result.message);
      setIsError(true);
    } else {
      resetAllData();
      navigator("/signin");
    }

    setIsLoading(false);
  }

  return {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    showPassword,
    setShowPassword,
    handlePasswordShow,
    isLoading,
    setIsLoading,
    error,
    setError,
    isError,
    setIsError,
    handleSignup,
    navigator
  }
}

export default useUserSignup;
