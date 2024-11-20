import React from "react";
import SmallButton from "../Buttons/SmallButton";
import { reduseTextLength } from "../../utils/utilFunctions";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

function MyListingCard({ list, refreshListings }) {

  const navigator = useNavigate();
  
  const { handleDeleteData, loading, data, error } = useFetch(
    `/api/listing/delete/${list._id}`
  );

  async function handleDeleteListing() {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;
    await handleDeleteData();
    if (!error.isError) refreshListings();
  }

  const handleEditBtnClick = () => {
    navigator(`/update/${list._id}`);
  }

  const handleViewBtnClick = () => {
    navigator(`/listing/${list?._id}`);
  }

  return (
    <div className="mb-6">
      <div
        key={list?._id}
        className="p-4 relative rounded-md bg-gray-300 dark:bg-slate-700 bg-opacity-50 dark:text-white grid grid-flow-col grid-cols-4 justify-between items-center"
      >
        {loading && (
          <div className="h-full w-full absolute  bg-gray-300 dark:bg-black bg-opacity-75 z-10 rounded-md grid place-content-center">
            Deleting...
          </div>
        )}
        <div className="h-full md:h-20 object-cover rounded-md overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={
              list?.imageUrls[0] || "https://placehold.co/200x100?text=OpenDoor"
            }
            alt="Property Image"
          />
        </div>
        <div className="py-1 px-4 col-span-2">
          <p className="">{list?.name || "Property"}</p>
          <p className="text-xs md:text-sm opacity-70 font-thin">
            {reduseTextLength(list?.description, 50) || "Description"}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <SmallButton styleObj={{ backgroundColor: "#3b82f6" }} style="w-20" onBtnClick={handleEditBtnClick}>
            Edit
          </SmallButton>
          <SmallButton
            onBtnClick={handleDeleteListing}
            styleObj={{ backgroundColor: "#d43131" }}
            style="w-20"
          >
            Delete
          </SmallButton>
          <SmallButton onBtnClick={handleViewBtnClick}>
            View
          </SmallButton>
        </div>
      </div>
      {error.isError && (
        <p className="text-red-500 text-sm opacity-60">😵{error.message}</p>
      )}
    </div>
  );
}

export default MyListingCard;
