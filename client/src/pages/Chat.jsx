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
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat } =
    useContext(ChatContext);

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
      <Container maxWidth={false} sx={{ padding: 0, overflowX: "auto" }}>
        <Stack sx={{ minHeight: "60px" }}>
          <PotentialChats />
        </Stack>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{ height: "calc(100vh - 20vh)", justifyContent: "space-evenly" }}>
          <Box
            className="chatList"
            sx={{
              width: { xs: "100%", md: "350px" },
              height: { xs: "auto", md: "100%" },
              overflowY: "none",
            }}>
            {userChatsError && (
              <Typography color="error">{userChatsError}</Typography>
            )}
            {isUserChatsLoading && <CircularProgress size={24} />}
            {userChats &&
              userChats?.map((chat, index) => {
                return (
                  <div key={index} onClick={() => updateCurrentChat(chat)}>
                    <UserChat chat={chat} user={user} />
                  </div>
                );
              })}
          </Box>
          <Box
            className="chatMessages"
            sx={{
              width: { xs: "100%", md: "580px" },
              height: { xs: "calc(100vh - 60px - 280px)", md: "100%" },
            }}>
            <ChatBox />
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default Chat;
