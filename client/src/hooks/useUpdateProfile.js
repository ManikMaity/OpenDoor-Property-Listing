import { useState } from "react";
import { clearFalsyObjValue } from "../utils/utilFunctions";

function useUpdateProfile(username, password, profileImageLink, user, setUser) {

    const [isUpdating, setIsUpdating] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
  
    async function handleUpdate() {
      try {
        const data = clearFalsyObjValue({
          username,
          password,
          profileImage: profileImageLink,
        });
        setIsUpdating(true);
        const response = await fetch(`/api/user/update/${user._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        });
        const result = await response.json();
        console.log(result);
        if (result.success === true) {
          setIsSuccess(true);
          setIsError(false);
          setUser(result.data);
        } else {
          setIsError(true);
          setIsSuccess(false);
        }
      } catch (err) {
        setIsError(true);
      } finally {
        setIsUpdating(false);
      }
    }

    return {
        isUpdating,
        isError,
        isSuccess,
        handleUpdate
    }
}

export default useUpdateProfile
