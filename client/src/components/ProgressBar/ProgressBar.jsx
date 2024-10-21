import React from "react";

function ProgressBar({customStyle ="", progress = 40}) {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-1 mb-4 dark:bg-gray-700 ${customStyle}`}>
      <div
        className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
