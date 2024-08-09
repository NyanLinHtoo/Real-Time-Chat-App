import {
  Container,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";

const Chat = () => {
  const theme = createTheme({
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            // paddingTop: "100px",
            color: "black",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="div">
          Chat Component
        </Typography>
        {/* Your chat component content goes here */}
      </Container>
    </ThemeProvider>
  );
};

export default Chat;
