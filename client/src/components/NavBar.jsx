import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  createTheme,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleNavigation = (path) => {
    if (user) {
      console.log("I have user");
      if (location.pathname !== "/chat") {
        navigate("/chat", { replace: true });
      }
    } else {
      console.log("No user");
      if (location.pathname !== path) {
        navigate(path, { replace: true });
      }
    }
  };

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
            sx={{ backgroundColor: "inherit", cursor: "pointer" }}
            onClick={() => handleNavigation("/chat")}>
            ChapApp
          </Typography>

          {user && (
            <Typography variant="body2" sx={{ backgroundColor: "inherit" }}>
              logged in as {user.name}
            </Typography>
          )}

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ backgroundColor: "inherit" }}>
            <Typography
              onClick={() => handleNavigation("/login")}
              sx={{
                backgroundColor: "inherit",
                cursor: "pointer",
                color: "inherit",
              }}>
              Login
            </Typography>
            <Typography
              onClick={() => handleNavigation("/register")}
              sx={{
                backgroundColor: "inherit",
                cursor: "pointer",
                color: "inherit",
              }}>
              Register
            </Typography>
          </Stack>
        </Toolbar>
      </Container>
    </ThemeProvider>
  );
};

export default NavBar;
