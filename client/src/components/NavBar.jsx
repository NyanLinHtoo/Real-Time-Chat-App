import {
  Container,
  createTheme,
  Link,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";

const NavBar = () => {
  const theme = createTheme({
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth={false}
        sx={{ backgroundColor: "#1f435d", padding: 0 }}
        className="custom-container">
        <Toolbar
          sx={{ backgroundColor: "inherit", justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ backgroundColor: "inherit" }}>
            <Link
              href="/chat"
              underline="none"
              color="inherit"
              sx={{ backgroundColor: "inherit" }}>
              ChapApp
            </Link>
          </Typography>

          <Typography variant="body2" sx={{ backgroundColor: "inherit" }}>
            logged in as Nyan Lin Htoo
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ backgroundColor: "inherit" }}>
            <Link
              href="/login"
              underline="none"
              color="inherit"
              sx={{ backgroundColor: "inherit" }}>
              Login
            </Link>
            <Link
              href="/register"
              underline="none"
              color="inherit"
              sx={{ backgroundColor: "inherit" }}>
              Register
            </Link>
          </Stack>
        </Toolbar>
      </Container>
    </ThemeProvider>
  );
};

export default NavBar;
