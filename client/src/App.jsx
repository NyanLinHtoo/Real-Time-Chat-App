import { Container } from "@mui/material";
import AppRouter from "./config/AppRouter";

const App = () => {
  return (
    <>
      <Container maxWidth={false} sx={{ p: 0 }} className="custom-container">
        <AppRouter />
      </Container>
    </>
  );
};

export default App;
