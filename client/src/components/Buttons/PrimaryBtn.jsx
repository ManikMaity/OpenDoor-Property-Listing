import React from "react";

function PrimaryBtn({
  style = "",
  onBtnClick = () => {
    console.log("Working");
  },
  disabled = false,
  children
}) {
  return (
    <button
        onClick={onBtnClick}
        disabled={disabled}
      className={
        "w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:focus:ring-transparent disabled:bg-gray-500 disabled:text-gray-200 disabled:cursor-no-drop" +
        style
      }
    >
      {children}
    </button>
  );
}

export default PrimaryBtn;
