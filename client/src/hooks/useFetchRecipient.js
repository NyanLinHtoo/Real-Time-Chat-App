import { useEffect, useState } from "react";
import { userService } from "../services/apiServices";
import { toast } from "sonner";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members?.find((id) => id !== user?._id);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return;

      setError(null);
      try {
        const res = await userService.findUser(recipientId);

        if (res.data.error || res.data.message) {
          setError(res.data.error || res.data.message);
          toast.error(res.data.error || res.data.message);
          return;
        }
        setRecipientUser(res.data.user);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred during fetch";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    };
    getUser();
  }, [recipientId]);

  return { recipientUser, error };
};
