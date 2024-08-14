import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import PropTypes from "prop-types";
import {
  Stack,
  Typography,
  Avatar,
  Badge,
  ThemeProvider,
  createTheme,
  Box,
} from "@mui/material";
import avator from "../../assets/undraw_male_avatar_g98d.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotificationsFunc";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";

const theme = createTheme({
  components: {
    MuiStack: {
      styleOverrides: {
        root: {
          "&.userChatContainer": {
            padding: "10px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            border: "none",
            marginBottom: "10px",
            marginTop: "10px",
            cursor: "pointer",
            width: "98%",
            textAlign: "left",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.userName": {
            fontWeight: "bold",
          },
          "&.lastMessage": {
            color: "text.secondary",
            fontSize: "0.875rem",
          },
          "&.timestamp": {
            color: "text.secondary",
            fontSize: "0.75rem",
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        root: {
          "&.msg-count": {
            "& .MuiBadge-badge": {
              backgroundColor: "#1976d2",
              color: "white",
              marginRight: "15px",
            },
          },
        },
      },
    },
  },
});

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers, notifications, markThisUserNotificationsAsRead } =
    useContext(ChatContext);
  const { latestMessage } = useFetchLatestMessage(chat);

  const unreadNotifications = unreadNotificationsFunc(notifications);
  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n.senderId == recipientUser?._id
  );

  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );

  const truncateText = (text) => {
    let shortText = text.substring(0, 15);

    if (text.length > 15) {
      shortText = shortText + "...";
    }
    return shortText;
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between" }}
        className="userChatContainer"
        component="button"
        onClick={() => {
          if (thisUserNotifications?.length !== 0) {
            markThisUserNotificationsAsRead(
              thisUserNotifications,
              notifications
            );
          }
        }}>
        <Stack direction="row" spacing={2}>
          <Avatar src={avator} alt={recipientUser?.name}></Avatar>
          <Stack>
            <Typography className="userName">{recipientUser?.name}</Typography>
            {latestMessage?.text ? (
              <Typography className="lastMessage">
                {truncateText(latestMessage.text)}
              </Typography>
            ) : (
              <Typography className="lastMessage">
                No message sent yet...
              </Typography>
            )}
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems="flex-end">
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
            }}>
            <Typography className="timestamp">
              {moment(latestMessage?.createdAt).calendar()}
            </Typography>
            {isOnline && (
              <Badge
                className="user-online"
                variant="dot"
                sx={{
                  position: "absolute",
                  top: -15,
                  right: -15,
                }}
              />
            )}
          </Box>
          <Badge
            badgeContent={thisUserNotifications?.length}
            className="msg-count"
          />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

UserChat.propTypes = {
  chat: PropTypes.shape({
    members: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  user: PropTypes.object,
};

export default UserChat;
