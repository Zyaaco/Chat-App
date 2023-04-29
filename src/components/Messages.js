import React, { useContext, useEffect, useRef } from "react";
import { useChatContext } from "../context/ChatContext";
import { UserContext } from "@/context/UserContext";

const Messages = () => {
  const { messages } = useChatContext();
  const messagesRef = useRef(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Scroll to the bottom of the messages container
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  return (
    <div
      ref={messagesRef}
      className="flex flex-col flex-grow p-4 overflow-y-auto scroll-smooth"
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex mb-4 p-4 w-full rounded-md text-white bg-black/10 hover:bg-black/20 duration-100`}
        >
          <img
            src={message.image}
            alt={message.username}
            className="w-10 h-10 mr-2 rounded-full object-cover"
          />
          <div>
            <div className="text-md font-medium">{message.username}</div>
            <div className="max-w-1xl wrapping text-gray-300">
              {message.content}
            </div>
            <div className="text-xs text-gray-500">
              {message.created_at.split("T")[0] +
                " " +
                message.created_at.split("T")[1].split(".")[0]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
