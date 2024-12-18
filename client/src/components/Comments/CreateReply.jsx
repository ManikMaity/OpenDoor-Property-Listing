import React, { useState } from "react";
import TextInput from "../Input/TextInput";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import useFetch from "../../hooks/useFetch";
import LoaderSpinner from "../Loaders/LoaderSpinner";

function CreateReply({ commentId, listingId, refetch }) {
    
  const [replyMessage, setReplyMessage] = useState("");
  const {handlePostData, loading, error} = useFetch(`/api/comment/reply/${commentId}`);

  const onReplySubmitfn = async (e) => {
    e.preventDefault();
    e.stopPropagation()
    if (replyMessage.trim() == "") return;
    await handlePostData(
      {
        content: replyMessage,
        listing: listingId,
         commentType: "reply"
      },
      () => {
        setReplyMessage("");
        refetch();
      }
    );
  };

  return (
    <form onSubmit={onReplySubmitfn} className="flex items-center gap-2">
      <TextInput
        text={replyMessage}
        setText={setReplyMessage}
        styleObj={{ padding: "3px 10px", width: "80%" }}
        placeholder="Type your reply here..."
      />
      <PrimaryBtn type="submit"  styleObj={{ padding: "3px 10px", width: "20%" }}>
        {loading ? <LoaderSpinner/> : "Reply"}
      </PrimaryBtn>
    </form>
  );
}

export default CreateReply;
