import { Container, Link, Stack, Toolbar, Typography } from "@mui/material";

const NavBar = () => {
  return (
    <Container maxWidth="lg" sx={{ backgroundColor: "#2c3539" }}>
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
  );
};

export default NavBar;
