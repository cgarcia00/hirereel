import React, { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messagesByChat, setMessagesByChat] = useState({});
  const [readStatus, setReadStatus] = useState({});

  const addMessage = (chatId, message) => {
    setMessagesByChat((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), message],
    }));
  };

  const getMessages = (chatId) => {
    return messagesByChat[chatId] || [];
  };

  const markAsRead = (chatId) => {
    setReadStatus((prev) => ({
      ...prev,
      [chatId]: true,
    }));
  };

  const isMessageRead = (chatId) => {
    return readStatus[chatId] || false;
  };

  const value = {
    messagesByChat,
    addMessage,
    getMessages,
    markAsRead,
    isMessageRead,
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
};

export default MessageProvider;
