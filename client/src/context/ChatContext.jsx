import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  chatService,
  messageService,
  userService,
} from "../services/apiServices";
import { toast } from "sonner";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const res = await userService.getAll();

      if (res.data.error || res.data.message) {
        setError(res.data.error || res.data.message);
        toast.error(res.data.error || res.data.message);
        return;
      }
      const pChats = res.data.user.filter((u) => {
        let isChatCreated = false;

        if (user?._id === u._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return (
              Array.isArray(chat.members) &&
              (chat.members[0] === u._id || chat.members[1] === u._id)
            );
          });
        }

        return !isChatCreated;
      });
      setPotentialChats(pChats);
    };
    getUsers();
  }, [userChats, user?._id]);

  useEffect(() => {
    const getUserChats = async () => {
      if (!user || !user._id) return;

      setIsLoading(true);
      setError(null);
      try {
        const res = await chatService.getOne(user._id);

        if (res.data.error || res.data.message) {
          setError(res.data.error || res.data.message);
          toast.error(res.data.error || res.data.message);
          return;
        }
        setIsLoading(false);

        setUserChats(res.data);
      } catch (error) {
        setIsLoading(false);

        const errorMessage =
          error.response?.data?.message ||
          "An error occurred during fetch getUserChats";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    };
    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      // if (!user || !user._id) return;

      setIsLoading(true);
      setError(null);
      try {
        const res = await messageService.getOne(currentChat?._id);

        if (res.data.error || res.data.message) {
          setError(res.data.error || res.data.message);
          toast.error(res.data.error || res.data.message);
          return;
        }
        setIsLoading(false);

        setMessages(res.data);
      } catch (error) {
        setIsLoading(false);

        const errorMessage =
          error.response?.data?.message ||
          "An error occurred during fetch getUserChats";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    };
    getMessages();
  }, [currentChat]);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    try {
      const res = await chatService.createChat({ firstId, secondId });

      setUserChats((prev) => [...(Array.isArray(prev) ? prev : []), res.data]);
    } catch (error) {
      toast.error("An error occurred while creating the chat");
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isLoading,
        error,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        currentChat,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object,
};
