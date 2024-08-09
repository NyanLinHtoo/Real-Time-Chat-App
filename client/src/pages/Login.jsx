import { useContext } from "react";
import { Stack, Button, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../context/AuthContext";

// Create a custom theme
const theme = createTheme({
  palette: {
    background: {
      default: "#f5f5f5", // Light grey background color
    },
  },
  components: {
    MuiStack: {
      styleOverrides: {
        root: {
          borderRadius: 6, // Rounded corners for Form
          margin: 120,
          width: "35%",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "30px", // Add padding here
          borderTop: "5px solid #4372ba",
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center items horizontally
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%", // Use full width of the parent
          maxWidth: "350px", // Set a max-width for larger screens
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%", // Use full width of the parent
          "& .MuiFilledInput-root": {
            borderRadius: 6, // Rounded corners for TextField
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6, // Rounded corners for Button
          width: "100%", // Use full width of the parent
          maxWidth: "400px", // Set a max-width for larger screens
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 6, // Rounded corners for Alert
          width: "100%", // Use full width of the parent
          maxWidth: "400px", // Set a max-width for larger screens
        },
      },
    },
  },
});

const Login = () => {
  const { loginInfo, updateLoginInfo, loginUser, isLoading } =
    useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <Stack
        component="form"
        onSubmit={loginUser}
        noValidate
        autoComplete="off"
        spacing={3}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "black", textAlign: "center" }}>
          Login
        </Typography>
        <TextField
          required
          id="email"
          label="Email"
          variant="filled"
          // value={formValues.email}
          onChange={(e) => {
            updateLoginInfo({ ...loginInfo, email: e.target.value });
          }}
          fullWidth
        />
        <TextField
          required
          id="password"
          label="Password"
          type="password"
          variant="filled"
          // value={formValues.password}
          onChange={(e) => {
            updateLoginInfo({ ...loginInfo, password: e.target.value });
          }}
          fullWidth
        />
        <Button type="submit" variant="contained" fullWidth>
          {isLoading ? "Getting you in..." : "Login"}
        </Button>
      </Stack>
    </ThemeProvider>
  );
};

export default Login;
