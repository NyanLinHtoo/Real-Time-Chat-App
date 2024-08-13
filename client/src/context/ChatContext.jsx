import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  chatService,
  messageService,
  userService,
} from "../services/apiServices";
import { toast } from "sonner";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessages] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // initial socket
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    //cleanup function
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // add online users
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  // send Message
  useEffect(() => {
    if (socket === null) return;

    const recipientId = currentChat?.members?.find((id) => id !== user?._id);

    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  // recieve message & notification
  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
    });

    socket.on("getNotification", (res) => {
      const isChatOpen = currentChat?.members?.some(
        (id) => id === res?.senderId
      );

      if (isChatOpen) {
        setNotifications((prev) => [...prev, { ...res, isRead: true }]);
      } else {
        setNotifications((prev) => [...prev, res]);
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentChat]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await userService.getAll();

      if (res.data.error || res.data.message) {
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
      setAllUsers(res.data.user);
    };
    getUsers();
  }, [userChats, user?._id]);

  useEffect(() => {
    const getUserChats = async () => {
      if (!user || !user._id) return;

      setIsUserChatsLoading(true);
      setUserChatsError(null);
      try {
        const res = await chatService.getOne(user._id);

        if (res.data.error || res.data.message) {
          setUserChatsError(res.data.error || res.data.message);
          toast.error(res.data.error || res.data.message);
          return;
        }
        setIsUserChatsLoading(false);

        setUserChats(res.data);
      } catch (error) {
        setIsUserChatsLoading(false);

        const errorMessage =
          error.response?.data?.message ||
          "An error occurred during fetch getUserChats";
        setUserChatsError(errorMessage);
        toast.error(errorMessage);
      }
    };
    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);
      try {
        const res = await messageService.getOne(currentChat?._id);

        if (res.data.error || res.data.message) {
          setMessagesError(res.data.error || res.data.message);
          toast.error(res.data.error || res.data.message);
          return;
        }
        setIsMessagesLoading(false);

        setMessages(res.data);
      } catch (error) {
        setIsMessagesLoading(false);

        const errorMessage =
          error.response?.data?.message ||
          "An error occurred during fetch getUserChats";
        setMessagesError(errorMessage);
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

  const sentTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("You should type something...");

      setSendTextMessageError(null);
      try {
        const res = await messageService.createMessage({
          chatId: currentChatId,
          senderId: sender._id,
          text: textMessage,
        });

        if (res.data.error || res.data.message) {
          setSendTextMessageError(res.data.error || res.data.message);
          toast.error(res.data.error || res.data.message);
          return;
        }
        setNewMessages(res.data);
        setMessages((prev) => [...prev, res.data]);
        setTextMessage("");
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred during fetch getUserChats";
        setSendTextMessageError(errorMessage);
        toast.error(errorMessage);
      }
    },
    []
  );

  const markAllNotificationAsRead = useCallback((notifications) => {
    const mNotifications = notifications.map((n) => {
      return {
        ...n,
        isRead: true,
      };
    });
    setNotifications(mNotifications);
  }, []);

  const markNotificationAsRead = useCallback((n, userChats, user, noti) => {
    // find chat to open
    const desiredChat = userChats.find((chat) => {
      const chatMembers = [user._id, n.senderId];
      const isDesiredChat = chat?.members.every((member) => {
        return chatMembers.includes(member);
      });
      return isDesiredChat;
    });
    // mark notification as read
    const mNotifications = noti.map((el) => {
      if (n.senderId === el.senderId) {
        return { ...n, isRead: true };
      } else {
        return el;
      }
    });
    updateCurrentChat(desiredChat);
    setNotifications(mNotifications);
  }, []);

  const markThisUserNotificationsAsRead = useCallback(
    (thisUserNotifications, notifications) => {
      const mNotifications = notifications.map((el) => {
        let notification;

        thisUserNotifications.forEach((n) => {
          if (n.senderId === el.senderId) {
            notification = { ...n, isRead: true };
          } else {
            notification = el;
          }
        });
        return notification;
      });
      setNotifications(mNotifications);
    },
    []
  );

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        currentChat,
        sendTextMessageError,
        sentTextMessage,
        onlineUsers,
        notifications,
        allUsers,
        markAllNotificationAsRead,
        markNotificationAsRead,
        markThisUserNotificationsAsRead,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object,
};
