import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { messageService } from "../services/apiServices";
import { toast } from "sonner";

export const useFetchLatestMessage = (chat) => {
  const { newMessage, notifications } = useContext(ChatContext);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await messageService.getOne(chat?._id);

        if (res.data.error || res.data.message) {
          toast.error(res.data.error || res.data.message);
          return;
        }

        const lastMessage = res.data[res.data?.length - 1];

        setLatestMessage(lastMessage);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred during fetch lastmessage";
        toast.error(errorMessage);
      }
    };
    getMessages();
  }, [newMessage, notifications]);
  return { latestMessage };
};
