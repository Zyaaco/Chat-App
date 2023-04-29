import React from "react";
import { useChatContext } from "../context/ChatContext";
import { IconSend } from "@tabler/icons-react";
import { IconArrowBadgeRightFilled } from "@tabler/icons-react";

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
        className="flex-grow bg-[#3B3B3B] p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-200 duration-300"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-[#3B3B3B]/50 focus:bg-[#3B3B3B]/20 hover:bg-[#3B3B3B]/20 duration-300 text-white rounded-r-md"
      >
        <IconArrowBadgeRightFilled />
      </button>
    </form>
  );
};

export default Input;
