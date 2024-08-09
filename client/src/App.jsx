import { Container } from "@mui/material";
import AppRouter from "./config/AppRouter";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Container maxWidth={false} sx={{ p: 0 }} className="custom-container">
        <AppRouter />
        <Toaster position="top-right" richColors />
      </Container>
    </>
  );
};

export default App;
