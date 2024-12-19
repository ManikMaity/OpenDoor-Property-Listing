import React, { useState } from "react";
import { timeAgo } from "../../utils/utilFunctions";
import SmallButton from "../Buttons/SmallButton";
import { MdDelete } from "react-icons/md";
import CreateReply from "./CreateReply";
import useFetch from "../../hooks/useFetch";

const replyObj = {
  _id: 1,
  name: "Michael Green",
  date: "December 17, 2024",
  text: "React is awesome for reusable components!",
  profileImage: "https://via.placeholder.com/50",
};

function Reply({ replyObjValue = replyObj, refetch }) {

  const [reply, setReply] = useState(replyObjValue);

  const [showReplyInput, setShowReplyInput] = useState(false);
  

  const {
    handleDataFech,
    loading: replyLoading,
    error: replyError,
    data: repliesData,
  } = useFetch(`/api/comment/replies/${reply?._id}`);

  const { handleDeleteData, loading, error } = useFetch(
    `/api/comment/${reply?._id}`
  );

  async function handleReplyClick() {
    const newReplyObj = await handleDataFech(async (data) => {
      setReply(data);
    });
  }

  async function handleDeleteReply() {
    if (!window.confirm("Are you sure you want to delete this reply?"))
      return;
    await handleDeleteData(async () => await refetch());
  }

  return (
    <div
      key={reply?._id}
      className="flex flex-col text-sm space-x-4 ml-2 md:ml-3 bg-gray-100 dark:bg-slate-700 p-3 rounded-lg border border-gray-400"
    >
      <div className="w-full">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <div className="md:w-8 md:h-8 grid place-content-center h-6 w-6 rounded-full bg-gray-400 ">
              <b>{reply?.user?.username[0]?.toUpperCase()}</b>
            </div>

            <h4 className="font-medium">{reply?.user?.username}</h4>
          </div>
          <div>
            <SmallButton onBtnClick={handleDeleteReply}>
              <MdDelete />
            </SmallButton>
          </div>
        </div>
        <p className="mt-1">{reply?.content}</p>
        <div className="flex items-center justify-between gap-2 mb-2 text-gray-400">
          <span className="text-sm">{timeAgo(reply?.updatedAt)}</span>
          <div className="flex items-center gap-2">
          <a onClick={handleReplyClick} className="text-sm text-gray-500 hover:underline cursor-pointer">
            Replies ({reply?.replies?.length})
          </a>
          <SmallButton onBtnClick={() => setShowReplyInput(p => !p)} styleObj={{ width: "fit-content" }}>Reply</SmallButton>
          </div>
        </div>
        {showReplyInput && <CreateReply commentId={reply?._id} listingId={reply?.listing} refetch={handleReplyClick}/>}
      </div>
      {/* Replies */}
            {reply?.replies.length > 0 && reply?.replies[0]?._id && (
              <div className="mt-4 space-y-3 text-gray-700 dark:text-white">
                {/* replies goes here */}
                {reply?.replies.map((reply) => (
                  <Reply key={reply._id} replyObjValue={reply} refetch={handleReplyClick} />
                ))}
              </div>
            )}
    </div>
  );
}

export default Reply;
