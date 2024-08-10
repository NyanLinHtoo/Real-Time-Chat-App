import { useContext } from "react";
import {
  Container,
  createTheme,
  Stack,
  ThemeProvider,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { ChatContext } from "../context/ChatContext";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isLoading, error } = useContext(ChatContext);

  console.log("User Chats => ", userChats);

  const theme = createTheme({
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
      MuiStack: {
        styleOverrides: {
          root: {
            width: "100%",
            color: "black",
          },
        },
      },
      MuiBox: {
        styleOverrides: {
          root: {
            "&.chatList": {
              flexGrow: 0,
              width: "150%", // Match the width of UserChat
            },
            "&.chatMessages": {
              flexGrow: 1,
              width: "100%", // Adjust as needed
              position: "absolute",
              left: "25%", // Position at the end of UserChat
              top: 0,
              bottom: 0,
              right: 0,
              backgroundColor: "red", // Add background color for visibility
              padding: 2,
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: "black",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false} sx={{ padding: 0, overflowX: "hidden" }}>
        <Stack direction="row" spacing={0} sx={{ position: "relative" }}>
          <Box className="chatList" sx={{ position: "relative", zIndex: 1 }}>
            {error && <Typography color="error">{error}</Typography>}
            {isLoading && <CircularProgress size={24} />}
            {userChats &&
              userChats?.map((chat, index) => {
                return (
                  <div key={index}>
                    <UserChat chat={chat} user={user} />
                  </div>
                );
              })}
          </Box>
          <Box
            className="chatMessages"
            sx={{
              position: "absolute",
              left: "25%", // Position at the end of UserChat
              top: 0,
              bottom: 0,
              right: 0,
              padding: 2, // Add some padding
            }}>
            <Typography variant="body2">Chat Messages</Typography>
            {/* Add your chat messages content here */}
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default Chat;
