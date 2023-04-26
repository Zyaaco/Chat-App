import React from "react";
import { useChatContext } from "../context/ChatContext";

const Input = () => {
  const { inputValue, setInputValue, insertMessage } = useChatContext();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission

    if (inputValue.trim() !== "") {
      // Add validation to check for non-blank input
      insertMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mx-4">
      <input
        type="text"
        placeholder="Type a message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-grow p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
      >
        Send
      </button>
    </form>
  );
};

export default Input;
