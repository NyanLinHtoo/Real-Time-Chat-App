import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { chatService } from "../services/apiServices";
import { toast } from "sonner";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
          error.response?.data?.message || "An error occurred during fetch";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    };
    getUserChats();
  }, [user, user?.id]);

  return (
    <ChatContext.Provider value={{ userChats, isLoading, error }}>
      {children}
    </ChatContext.Provider>
  );
};

ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object,
};
