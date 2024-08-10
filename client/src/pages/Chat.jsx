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
import PotentialChats from "../components/chat/PotentialChats";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isLoading, error } = useContext(ChatContext);

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
            "&.chatMessages": {
              flexGrow: 1,
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
        <Stack sx={{ minHeight: "60px" }}>
          <PotentialChats />
        </Stack>
        <Stack direction="row" spacing={3}>
          <Box className="chatList" sx={{ width: "280px" }}>
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
          <Box className="chatMessages">
            <Typography variant="body2">Chat Messages</Typography>
            {/* Add your chat messages content here */}
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default Chat;
