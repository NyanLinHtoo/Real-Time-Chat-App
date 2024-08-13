import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { messageService } from "../services/apiServices";
import { toast } from "sonner";

export const useFetchLatestMessage = (chat) => {
  const { newMessage, notifications } = useContext(ChatContext);
  const [lastestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await messageService.getOne(chat?._id);

        if (res.data.error || res.data.message) {
          toast.error(res.data.error || res.data.message);
          return;
        }

        const lastMessage = res.data[res.data?.length - 1];
        console.log("Last Message =>", lastMessage);

        setLatestMessage(lastMessage);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred during fetch getUserChats";
        toast.error(errorMessage);
      }
    };
    getMessages();
  }, [newMessage, notifications]);
  return { lastestMessage };
};
