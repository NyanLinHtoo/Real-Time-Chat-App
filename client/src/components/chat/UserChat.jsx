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
            width: "100%",
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

  return (
    <ThemeProvider theme={theme}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between" }}
        className="userChatContainer"
        component="button">
        <Stack direction="row" spacing={2}>
          <Avatar src={avator} alt={recipientUser?.name}></Avatar>
          <Stack>
            <Typography className="userName">{recipientUser?.name}</Typography>
            <Typography className="lastMessage">Text Message</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems="flex-end">
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
            }}>
            <Typography className="timestamp">10/08/2024</Typography>
            <Badge
              className="user-online"
              variant="dot"
              sx={{
                position: "absolute",
                top: -15,
                right: -15,
              }}
            />
          </Box>
          <Badge badgeContent={2} className="msg-count" />
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
