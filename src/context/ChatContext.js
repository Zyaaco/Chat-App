// ChatContext.js

import React, { useState, useContext, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { UserContext } from "./UserContext";
import { toast } from "react-hot-toast";

// Create a chat context with initial state
const ChatContext = React.createContext({
  messages: [],
  inputValue: "",
  setInputValue: () => {},
  sendMessage: () => {},
});

// Custom hook to consume the chat context
export const useChatContext = () => useContext(ChatContext);

// Provider component to wrap the chat components and provide the chat context
export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { user } = useContext(UserContext);

  async function getMessages() {
    const { data: messages, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.log(error);
    } else {
      setMessages(messages);
    }

    supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (message) => {
          sendMessage(message.new);
        }
      )
      .subscribe();
  }
  useEffect(() => {
    getMessages();
  }, []);

  const insertMessage = async (content) => {
    if (!user) {
      toast.error("Please log in to send a message");
      return;
    }
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          username: user.user_metadata.name,
          content,
          userid: user.id,
          image: user.user_metadata.image,
        },
      ]);
  };

  // Method to send a message
  const sendMessage = (message) => {
    const newMessage = {
      username: message.username,
      content: message.content,
      created_at: message.created_at,
      userid: message.userid,
      image: message.image,
    };
    setMessages((oldMessages) => [...oldMessages, newMessage]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        inputValue,
        setInputValue,
        sendMessage,
        insertMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
