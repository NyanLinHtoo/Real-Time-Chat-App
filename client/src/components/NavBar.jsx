import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Container,
  createTheme,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
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
      if (location.pathname !== "/chat") {
        navigate("/chat", { replace: true });
      }
    } else {
      if (location.pathname !== path) {
        navigate(path, { replace: true });
      }
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const NavItem = ({ text, path, onClick }) => (
    <Typography
      onClick={onClick || (() => handleNavigation(path))}
      sx={{
        backgroundColor: "inherit",
        cursor: "pointer",
        color: "inherit",
      }}>
      {text}
    </Typography>
  );

  // Add prop types for NavItem
  NavItem.propTypes = {
    text: PropTypes.string.isRequired,
    path: PropTypes.string,
    onClick: PropTypes.func,
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
            <Typography
              variant="body2"
              sx={{ backgroundColor: "inherit", color: "#F6F8C3" }}>
              Logged in as{" "}
              {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
            </Typography>
          )}

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ backgroundColor: "inherit" }}>
            {user ? (
              <NavItem text="Logout" onClick={handleLogout} />
            ) : (
              <>
                <NavItem text="Login" path="/login" />
                <NavItem text="Register" path="/register" />
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </ThemeProvider>
  );
};

// Add prop types for NavItem

export default NavBar;
