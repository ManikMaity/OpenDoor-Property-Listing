import React, { useState } from "react";
import SmallButton from "../Buttons/SmallButton";
import { timeAgo } from "../../utils/utilFunctions";
import { MdDelete } from "react-icons/md";
import useFetch from "../../hooks/useFetch";
import Reply from "./Reply";


function CommentCard({ comment = commentObj, refetch }) {
  
  const [commentData, setCommentData] = useState(comment);

  const {handleDeleteData, loading, error} = useFetch(`/api/comment/${commentData?._id}`);

  async function handleDeleteComment() {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;
    await handleDeleteData(async() => await refetch());
  }

  const {handleDataFech, loading : replyLoading, error : replyError, data : repliesData} = useFetch(`/api/comment/replies/${commentData?._id}`);

  async function handleReplyClick() {
    const newCommentObj = await handleDataFech(
      async (data) => {
        setCommentData(data);
      }
    )
  }

  console.log(commentData);
  

  return (
    <div
      key={comment.id}
      className="md:p-4 p-2 bg-slate-800 rounded-lg border border-gray-500 space-y-4"
    >
      {/* Comment */}
      <div className="flex items-start space-x-4">
        <div className="md:w-12 md:h-12 grid place-content-center h-8 w-8 rounded-full bg-gray-400 ">
          <b>{commentData?.user?.username[0]?.toUpperCase()}</b>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{commentData?.user?.username}</h3>
            <div>
              <SmallButton onBtnClick={handleDeleteComment}>
                <MdDelete />
              </SmallButton>
            </div>
          </div>
          <p className="text-gray-700 dark:text-white mt-2">
            {commentData?.content}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-500">
              {timeAgo(commentData?.updatedAt)}
            </span>
            <div className="flex items-center space-x-2">
              <a onClick={handleReplyClick} className="text-sm text-gray-500 hover:underline cursor-pointer">
                Replies
              </a>
              <SmallButton styleObj={{ width: "fit-content" }}>
                Reply
              </SmallButton>
            </div>
          </div>
        </div>
      </div>

      {/* Replies */}
      {(commentData?.replies.length > 0 && commentData?.replies[0]?._id) && (
        <div className="mt-4 space-y-3 text-gray-700 dark:text-white">
          {/* replies goes here */}
          {commentData?.replies.map((reply) => (
            <Reply key={reply._id} replyObjValue={reply} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentCard;
