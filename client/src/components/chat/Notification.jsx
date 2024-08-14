import {
  Badge,
  Box,
  Fade,
  IconButton,
  Popper,
  Typography,
} from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotificationsFunc";
import moment from "moment";

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const { user } = useContext(AuthContext);
  const {
    notifications,
    userChats,
    allUsers,
    markAllNotificationAsRead,
    markNotificationAsRead,
  } = useContext(ChatContext);

  const unreadNotifications = unreadNotificationsFunc(notifications);

  const modifiedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderId);

    return {
      ...n,
      senderName: sender?.name,
    };
  });

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Box>
      <IconButton onClick={handleClick("bottom-end")} sx={{ color: "white" }}>
        <Badge badgeContent={unreadNotifications?.length} color="secondary">
          <ChatBubbleIcon />
        </Badge>
      </IconButton>
      <Popper
        sx={{ zIndex: 1200 }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                color: "#4e4e4e",
                background:
                  "linear-gradient(135deg, #e5e5e5 30%, #ffffff 100%)",
                padding: "8px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                minWidth: "250px",
                maxHeight: "500px",
                overflowY: "auto",
              }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "8px",
                  paddingX: "8px",
                  marginBottom: "8px",
                }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Notifications
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    // color: "secondary.main",
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={() => markAllNotificationAsRead(notifications)}>
                  Mark all as read
                </Typography>
              </Box>
              {modifiedNotifications?.length === 0 ? (
                <Typography sx={{ color: "#888" }}>
                  No notifications yet...
                </Typography>
              ) : (
                modifiedNotifications.map((n, index) => (
                  <Box
                    key={index}
                    sx={{
                      padding: "8px",
                      borderRadius: "6px",
                      backgroundColor: n.isRead ? "#f7f7f7" : "#d1e7ff",
                      "&:hover": {
                        backgroundColor: n.isRead ? "#f0f0f0" : "#c4dbff",
                      },
                      cursor: "pointer",
                      marginBottom: "8px",
                      boxShadow: n.isRead
                        ? "none"
                        : "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                    onClick={() => {
                      markNotificationAsRead(n, userChats, user, notifications);
                      setOpen(false);
                    }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: n.isRead ? "normal" : "bold",
                      }}>
                      {n.senderName}
                    </Typography>
                    <Typography variant="body2">
                      {`${n.senderName} sent you a new message`}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "#888", marginTop: "4px" }}>
                      {moment(n.date).calendar()}
                    </Typography>
                  </Box>
                ))
              )}
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

export default Notification;
