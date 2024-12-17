import React from "react";
import SmallButton from "../Buttons/SmallButton";
import CommentCard from "./CommentCard";
import useFetch from "../../hooks/useFetch";
import useFetchQuery from "../../hooks/useFetchQuery";
import SmallCircleLoader from "../Loaders/SmallCircleLoader";
import { Link } from "react-router-dom";
import CreateComment from "./CreateComment";

const comments = [
  {
    id: 1,
    name: "John Doe",
    date: "December 15, 2024",
    profileImage: "https://via.placeholder.com/50",
    text: "This is a sample comment. Tailwind CSS makes styling effortless!",
    replies: [
      {
        id: 1,
        name: "Alice Brown",
        date: "December 16, 2024",
        text: "Absolutely agree with you!",
        profileImage: "https://via.placeholder.com/50",
      },
      {
        id: 2,
        name: "Mark Lee",
        date: "December 17, 2024",
        text: "Couldn’t have said it better!",
        profileImage: "https://via.placeholder.com/50",
      },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    date: "December 16, 2024",
    profileImage: "https://via.placeholder.com/50",
    text: "I completely agree! React and Tailwind are a great combination.",
    replies: [
      {
        id: 1,
        name: "Michael Green",
        date: "December 17, 2024",
        text: "React is awesome for reusable components!",
        profileImage: "https://via.placeholder.com/50",
      },
    ],
  },
];

function AllComments({ listingId }) {

  const {data, error, loading, handleRefetch} = useFetchQuery(`/api/comment/${listingId}`, [listingId]);
  console.log(data, error, loading);

  if (loading){
    return <div className="text-center mt-6"><SmallCircleLoader/></div>;
  }

  if (error?.isError && error?.message == "No token provided"){
    return <div className="text-center mt-6"> <Link className="text-blue-500" to={"/signin"}>Login</Link> to view comments</div>;
  }

  else if (error?.isError){
    return <div className="text-center mt-6"> {error.message} </div>;
  }


  return (
    <>
     <h2 className="text-2xl font-semibold mb-2">Comments</h2>
    <CreateComment listingId={listingId} refetch={handleRefetch}/>
    <div className="mx-auto mt-6 rounded-lg shadow-md">
      <div className="space-y-6">
        {data.map((comment) => (
          <CommentCard key={comment._id} refetch={handleRefetch} comment={comment} />
        ))}
      </div>
    </div>
    </>
  );
}

export default AllComments;
