import React, { useState } from "react";
import { timeAgo } from "../../utils/utilFunctions";
import SmallButton from "../Buttons/SmallButton";
import { MdDelete } from "react-icons/md";

const replyObj = {
    _id: 1,
    name: "Michael Green",
    date: "December 17, 2024",
    text: "React is awesome for reusable components!",
    profileImage: "https://via.placeholder.com/50",
  }

function Reply({ replyObjValue = replyObj }) {
 
  // TODO - REply Delete

  const [reply, setReply] = useState(replyObjValue);
  const handleReplyDelete =() => {

  }


  return (
    <div
      key={reply?._id}
      className="flex items-start space-x-4 ml-4 md:ml-6 bg-gray-200 dark:bg-slate-700 p-3 rounded-lg border border-gray-400"
    >
      <div>
        <div className="flex items-center gap-2 justify-between">
        <div className="md:w-12 md:h-12 grid place-content-center h-8 w-8 rounded-full bg-gray-400 ">
          <b>{reply?.user?.username[0]?.toUpperCase()}</b>
        </div>

          <h4 className="font-medium">{reply?.user?.username}</h4>
          <span className="text-sm">{timeAgo(reply?.updatedAt)}</span>
          <div>
              <SmallButton >
                <MdDelete />
              </SmallButton>
            </div>
        </div>
        <p className="mt-1">{reply?.content}</p>
      </div>
    </div>
  );
}

export default Reply;
