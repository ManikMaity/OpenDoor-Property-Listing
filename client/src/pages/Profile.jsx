import { useState } from "react";
import PrimaryBtn from "../components/Buttons/PrimaryBtn";
import SecondaryBtn from "../components/Buttons/SecondaryBtn";
import useUserStore from "../store/userStore";

const Profile = () => {


  const {user} = useUserStore()
  console.log(user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-12 px-4 md:px-6">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            User Profile
          </h2>
          <img
            src="https://via.placeholder.com/150"
            alt="User Profile"
            className="w-32 h-32 mt-4 rounded-full border-4 border-gray-300 shadow-lg"
          />
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 mt-8">
          {/* Username Input */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username here.."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          {/* Email Input */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value="manikmaity.haker2003@gmail.com"
              disabled
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 "
            />
          </div>

          {/* Password Input */}
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center mt-8 space-y-4 md:space-y-0">
          <PrimaryBtn disabled={true}>Update Profile</PrimaryBtn>
          <PrimaryBtn>Create New Listing</PrimaryBtn>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-row justify-between mt-8 text-sm">
          <button className="text-red-600 hover:underline">
            Delete Account
          </button>
          <button className="text-red-600 hover:underline">Sign out</button>
        </div>

        {/* Footer Section */}
        <div className="mt-8 text-center flex justify-center">
          <SecondaryBtn style={"max-w-md"}>
            Show my listings
          </SecondaryBtn>
        </div>
      </div>
    </div>
  );
};

export default Profile;
