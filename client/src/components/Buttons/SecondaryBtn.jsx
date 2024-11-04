import React from 'react'

function SecondaryBtn({
    style = "",
    onBtnClick = () => {
      console.log("Working");
    },
    children
}) {
  return (
    <button
        type="button"
        onClick={onBtnClick}
      className={
        `w-full flex items-center justify-center px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 ${style}` 
      }
    >
      {children}
    </button>
  )
}

export default SecondaryBtn
