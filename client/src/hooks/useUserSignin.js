import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function useUserSignin() {
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
    setPassword("");
    setEmail("");
    setShowPassword(false);
    setError("");
    setIsError(false);
  }

  async function handleSignin(e) {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    setIsLoading(true);

    const response = await fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(data),
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
      navigator("/");
    }
    setIsLoading(false);
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    handlePasswordShow,
    isLoading,
    handleSignin,
    error,
    isError,
  }
}

export default useUserSignin;
