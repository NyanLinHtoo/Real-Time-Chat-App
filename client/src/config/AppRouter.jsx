import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Chat from "../pages/Chat";
import NavBar from "../components/NavBar";
import { Container } from "@mui/material";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBarLayout />,
      children: [
        { path: "chat", element: <Chat /> },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },

    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return <RouterProvider router={router} />;
};

const NavBarLayout = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default AppRouter;
