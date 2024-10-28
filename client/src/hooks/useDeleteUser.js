import React, { useState } from 'react'

function useDeleteUser(user, setUser) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleteError, setIsDeleteError] = useState(false);
    const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  
    // delete
    const handleUserDelete = async () => {
      try {
        const sure = confirm("Are you sure you want to delete your account?");
        if (!sure) return;
        setIsDeleting(true);
        const response = await fetch(`/api/user/delete/${user._id}`, {
          method: "DELETE",
          credentials: "include",
        });
        const result = await response.json();
        if (result.success === true) {
          alert("Account deleted successfully!✔️");
          setUser({});
          setIsDeleteSuccess(true);
          setIsDeleteError(false);
        } else {
          setIsDeleteError(true);
          setIsDeleteSuccess(false);
        }
        
      }
      catch(err) {
        console.log(err);
        setIsDeleteError(true);
        setIsDeleteSuccess(false);
      }
      finally{
        setIsDeleting(false);
      }
    }

    return { handleUserDelete, isDeleting, isDeleteError, isDeleteSuccess }
}

export default useDeleteUser
