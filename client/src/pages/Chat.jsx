import { useContext } from "react";
import {
  Container,
  createTheme,
  ThemeProvider,
  Typography,
  CircularProgress,
} from "@mui/material";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const theme = createTheme({
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: "black",
          },
        },
      },
    },
  });

  const { userChats, isLoading, error } = useContext(ChatContext);
  console.log("User Chats => ", userChats);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="div">
          Chat Component
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default Chat;
