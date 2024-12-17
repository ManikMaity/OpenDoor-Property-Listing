import React from 'react'
import useUserStore from '../store/userStore';

function useSignout() {

  const { setUser } = useUserStore();

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

  return {handleSignOut};
}

export default useSignout
