import {} from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import SmallCircleLoader from "../components/Loaders/SmallCircleLoader";
import useUserSignin from "../hooks/useUserSignin";
import OAuthBtn from "../components/Buttons/OAuthBtn";

const Signin = () => {
  const {
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
  } = useUserSignin();

  return (
<div className="flex flex-col justify-center items-center screenHeight bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSignin}
        className="w-full max-w-md p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Sign In
        </h2>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="flex gap-2 items-center">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 mt-2 text-gray-900 bg-white border-gray-300 rounded-lg hover:bg-gray-100  dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
              onClick={handlePasswordShow}
            >
              {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
            </button>
          </div>
          {isError && <p className="text-red-600 mt-2 text-sm">{error}</p>}
        </div>

        {/* Sign In Button */}
        <button
          className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSignin}
        >
          {isLoading ? <SmallCircleLoader /> : "Sign In"}
        </button>

       
      </form>
      <div className="w-full max-w-md p-8 pt-0 space-y-6">

          {/* Continue with Google Button */}
          <OAuthBtn />

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
    </div>
    
  );
};

export default Signin;
