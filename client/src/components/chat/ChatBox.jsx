import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Box, Card, CircularProgress, Typography } from "@mui/material";
import moment from "moment";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isLoading } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);

  //   console.log("Current Chat====> ", currentChat);
  //   console.log("recipient Chat====> ", recipientUser);

  if (isLoading) {
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
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
                }}>
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
      </Card>
    </Box>
  );
};

export default ChatBox;
