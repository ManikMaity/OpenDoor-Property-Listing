import React from "react";

function TextInput({
  text = "",
  setText,
  inputTextType = "text",
  styleObj = {},
  placeholder = "Type here...",
}) {
  return (
    <input
      type={inputTextType}
      style={styleObj}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
      placeholder={placeholder}
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}

export default TextInput;
