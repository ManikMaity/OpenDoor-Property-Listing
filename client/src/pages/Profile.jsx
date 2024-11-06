import { useEffect, useRef, useState } from "react";
import PrimaryBtn from "../components/Buttons/PrimaryBtn";
import SecondaryBtn from "../components/Buttons/SecondaryBtn";
import useUserStore from "../store/userStore";
import { clearFalsyObjValue, handleFileUpload, reduseTextLength } from "../utils/utilFunctions";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import useUpdateProfile from "../hooks/useUpdateProfile";
import SmallCircleLoader from "../components/Loaders/SmallCircleLoader";
import useDeleteUser from "../hooks/useDeleteUser";
import { useNavigate } from "react-router-dom";
import useGetFetch from "../hooks/useGetFetch";
import SmallButton from "../components/Buttons/SmallButton";

const Profile = () => {
  const { user, setUser } = useUserStore();
  console.log(user);
  const navigator = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUploadError, setIsUploadError] = useState(false);
  const fileRef = useRef(null);
  const [profileImageLink, setProfileImageLink] = useState(null);
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(true);

  // update
  const { isUpdating, isError, isSuccess, handleUpdate } = useUpdateProfile(
    username,
    password,
    profileImageLink,
    user,
    setUser
  );

  // delete
  const { handleUserDelete, isDeleting, isDeleteError, isDeleteSuccess } =
    useDeleteUser(user, setUser);

  // signout
  async function handleSignOut() {
    try {
      const sure = confirm("Are you sure you want to sign out?");
      if (!sure) return;
      const response = await fetch("/api/user/signout", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      console.log(result);
      if (result.success === true) {
        setUser({}); // clear user data from store
        localStorage.removeItem("user"); // clear user data from local storage
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleGoToCreateListing() {
    navigator("/create-listing");
  }

  const {
    loading: loadingListing,
    data: listing,
    error: listingError,
    handleDataFech: handleShowUserListings,
  } = useGetFetch(`/api/listing/user/${user?._id}`);

  useEffect(() => {
    console.log(listing);
    console.log(listingError);
  }, [listing, listingError]);

  useEffect(() => {
    if (file) {
      handleFileUpload(
        file,
        setIsUploading,
        setIsFileUploaded,
        setProgress,
        setProfileImageLink,
        setIsUploadError
      );
    }
  }, [file]);

  useEffect(() => {
    if (
      profileImageLink ||
      (username && username != user?.username) ||
      password
    ) {
      setIsUpdateDisabled(false);
    } else {
      setIsUpdateDisabled(true);
    }
  }, [profileImageLink, username, password]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-4 px-4 sm:py-8 sm:px-6">
      <div className="w-full max-w-lg space-y-6">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            User Profile
          </h2>
          <div className="relative mt-4 w-24 h-24 sm:w-32 sm:h-32">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              ref={fileRef}
            />
            <img
              onClick={() => fileRef.current.click()}
              src={
                profileImageLink ||
                user?.profileImage ||
                "https://via.placeholder.com/150"
              }
              alt="User Profile"
              className="w-full h-full object-cover rounded-full border-4 border-gray-300 shadow-lg"
            />
          </div>
          {isUploading && (
            <ProgressBar progress={progress} customStyle="mt-4 max-w-xs" />
          )}
          {isFileUploaded && (
            <p className="text-green-400 mt-2">Profile Picture Uploaded ✔️</p>
          )}
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username || user?.username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={user?.email || "useremail"}
              disabled
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          {/* Password Input */}
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="text"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Error Message */}
        <div>
          {isUploadError && (
            <p className="text-red-400 text-sm col-span-2">
              😵 Error Uploading Profile Picture
            </p>
          )}
          {isError && (
            <p className="text-red-400 text-sm col-span-2">
              😵 Error Updating Profile
            </p>
          )}
          {isSuccess && (
            <p className="text-green-400 text-sm col-span-2">
              Profile Updated Successfully
            </p>
          )}
          {isDeleteError && (
            <p className="text-red-400 text-sm col-span-2">
              😵 Error Deleting Account
            </p>
          )}
          {listingError.isError && (
            <p className="text-red-400 text-sm col-span-2">
              😵 {listingError?.message || "Cant fetch user listings"}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <PrimaryBtn onBtnClick={handleUpdate} disabled={isUpdateDisabled}>
            <p>{isUpdating ? <SmallCircleLoader /> : "Update Profile"}</p>
          </PrimaryBtn>
          <PrimaryBtn onBtnClick={handleGoToCreateListing}>
            Create New Listing
          </PrimaryBtn>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-2 sm:space-y-0">
          <button
            className="text-red-600 hover:underline"
            onClick={handleUserDelete}
          >
            {isDeleting ? "Deleting" : "Delete Account"}
          </button>
          <button
            className="text-red-600 hover:underline"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>

        {/* Footer Section */}
        <div className="mt-6 text-center">
          <SecondaryBtn onBtnClick={handleShowUserListings}>
            {loadingListing ? <SmallCircleLoader /> : "Show my listings"}
          </SecondaryBtn>
        </div>

        {/* Listings Section  */}
        {listing.length > 0 &&
        <div className="mt-6">
          <h2 className="text-lg md:text-xl font-semibold text-white text-center mb-6">My Listings</h2>
          {listing.map((list) => {
            return (
              <div
                key={list._id}
                className="p-4 mb-6 rounded-md bg-gray-300 dark:bg-slate-700 bg-opacity-50 dark:text-white grid grid-flow-col grid-cols-4 justify-between items-center"
              >
                <div className="h-full md:h-20 object-cover rounded-md overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={
                      list.imageUrls[0] ||
                      "https://placehold.co/200x100?text=OpenDoor"
                    }
                    alt=""
                  />
                </div>
                <div className="py-1 px-4 col-span-2">
                  <p className="">{list.name || "Property"}</p>
                  <p className="text-xs md:text-sm opacity-70 font-thin">{reduseTextLength(list.description, 50)}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <SmallButton
                    styleObj={{ backgroundColor: "#3b82f6" }}
                    style="w-20"
                  >
                    Edit
                  </SmallButton>
                  <SmallButton
                    styleObj={{ backgroundColor: "#d43131" }}
                    style="w-20"
                  >
                    Delete
                  </SmallButton>
                </div>
              </div>
            );
          })}
          </div>
          }
      </div>
    </div>
  );
};

export default Profile;
