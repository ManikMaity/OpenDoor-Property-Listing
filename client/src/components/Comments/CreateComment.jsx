import React, { useState } from "react";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import useFetch from "../../hooks/useFetch";
import SmallCircleLoader from "../Loaders/SmallCircleLoader";

function CreateComment({listingId, refetch}) {

    const [commentText, setCommentText] = useState("");
    const {handlePostData, loading, error} = useFetch("/api/comment");
    async function onCommentSubmitfn (e) {
        e.preventDefault();
        if (commentText.trim() == "" ) return;
       const response =  await handlePostData({
            content : commentText,
            listing : listingId
        },
        () => {
            setCommentText("");
            refetch();
        }
        
    )
    }

  return (
    <div>
    <form onSubmit={onCommentSubmitfn} className="flex flex-col md:flex-row gap-2 justify-between">
      <input
        type="text"
        className="w-full md:w-[85%] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        placeholder="Type your comment here..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <div className="w-full md:w-[15%]">
      <PrimaryBtn type="Submit" disabled={loading}>{loading ? <SmallCircleLoader/> : "Comment"}</PrimaryBtn>
      </div>
    </form>
      {error?.isError && <p className="mt-1 text-sm text-red-500">😵 {error?.message || "An unexpected error occurs"}</p>}
    </div>
  );
}

export default CreateComment;
