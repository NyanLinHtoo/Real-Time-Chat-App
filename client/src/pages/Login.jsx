import { Stack, Button, TextField, Typography, Alert } from "@mui/material";
import { useState } from "react";

const Login = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form values:", formValues);
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      sx={{
        m: 20,
        width: "40%",
        marginLeft: "auto",
        marginRight: "auto",
        p: 3,
        bgcolor: "#f5f5f5", // Light grey background color
        borderRadius: 2, // Rounded corners
        boxShadow: 1,
      }}
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
        value={formValues.email}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        required
        id="password"
        label="Password"
        type="password"
        variant="filled"
        value={formValues.password}
        onChange={handleChange}
        fullWidth
      />
      <Button type="submit" variant="contained" fullWidth>
        Login
      </Button>
      <Alert severity="error">This is an error Alert.</Alert>
    </Stack>
  );
};

export default Login;
