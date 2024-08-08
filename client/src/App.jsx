import { Container } from "@mui/material";
import AppRouter from "./config/AppRouter";

const App = () => {
  return (
    <>
      <Container maxWidth="lg">
        <AppRouter />
      </Container>
    </>
  );
};

export default App;
