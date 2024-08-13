import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import {
  Box,
  Card,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sentTextMessage } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  if (!recipientUser) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center", mt: 3 }}>
        No conversation selected yet...
      </Typography>
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
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {recipientUser?.username || "Chat"}
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
          <InputEmoji
            borderColor=" rgba(72,112,223,0.2)"
            value={textMessage}
            onChange={setTextMessage}
            maxWidth="70%"
          />
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
