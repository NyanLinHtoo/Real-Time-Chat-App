import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import {
  Box,
  Card,
  CircularProgress,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Picker from "@emoji-mart/react";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sentTextMessage } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const [isEmojiBoxOpen, setIsEmojiBoxOpen] = useState(false);
  const scroll = useRef();
  const pickerRef = useRef(null);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEmojiSelect = (emoji) => {
    setTextMessage(textMessage + emoji.native);
  };

  //to close emojibox when click outside and stick with emoji icon
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isEmojiBoxOpen &&
        pickerRef.current &&
        !pickerRef.current.contains(e.target)
      ) {
        setIsEmojiBoxOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEmojiBoxOpen]);

  if (!recipientUser) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center", mt: 3 }}>
        No conversation selected yet...
      </Typography>
    );
  }

  if (!user) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading User...</p>
    );
  }

  if (isMessagesLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: { xs: "100%", md: "600px" },
      }}>
      <Card
        variant="outlined"
        sx={{
          flexGrow: 1,
          backgroundColor: "#e8e7e6",
          display: "flex",
          flexDirection: "column",
          overflowY: "none",
          p: 0,
        }}>
        <Box className="chatbox-header" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ textAlign: "center", color: "white" }}>
            {recipientUser?.name || "Chat"}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
          {messages.map((message) => {
            return (
              <Box
                key={message._id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems:
                    message.senderId === user?._id ? "flex-end" : "flex-start",
                  mb: 2,
                }}
                ref={scroll}>
                <Typography
                  variant="body2"
                  sx={{
                    backgroundColor:
                      message.senderId === user?._id ? "#a0e1e5" : "#f1f1f1",
                    borderRadius: 2,
                    p: 1,
                    maxWidth: "75%",
                  }}>
                  {message.text}
                </Typography>
                <Typography variant="caption" sx={{ mt: 0.5 }}>
                  {moment(message.createdAt).calendar()}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            paddingX: "15px",
            backgroundColor: "#316e99",
            display: "flex",
            justifyContent: "space-between",
          }}>
          <Box sx={{ display: "flex", width: "90%", position: "relative" }}>
            <InputBase
              multiline
              sx={{
                bgcolor: "white",
                m: 1,
                p: 1,
                borderRadius: "5px",
                whiteSpace: "pre-wrap",
              }}
              fullWidth
              value={textMessage}
              onChange={(e) => {
                setTextMessage(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sentTextMessage(
                    textMessage,
                    user,
                    currentChat._id,
                    setTextMessage
                  );
                  e.preventDefault();
                }
              }}
            />
            <IconButton
              sx={{ color: "white", paddingBottom: "11px" }}
              onClick={(e) => {
                e.preventDefault();
                setIsEmojiBoxOpen(!isEmojiBoxOpen);
              }}>
              <EmojiEmotionsIcon />
            </IconButton>
          </Box>
          {isEmojiBoxOpen && (
            <div
              ref={pickerRef}
              style={{
                position: "absolute",
                bottom: "100px",
                right: "40px",
                zIndex: 1000,
              }}>
              <Picker
                onEmojiSelect={handleEmojiSelect}
                theme="dark"
                style={{
                  width: "400px",
                  minWidth: "250px",
                  resize: "horizontal",
                  overflow: "auto",
                }}
                previewPosition="none"
              />
            </div>
          )}
          <IconButton
            aria-label="send"
            sx={{ color: "white", paddingBottom: "11px" }}
            onClick={() =>
              sentTextMessage(
                textMessage,
                user,
                currentChat._id,
                setTextMessage
              )
            }>
            <SendIcon />
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
};

export default ChatBox;
