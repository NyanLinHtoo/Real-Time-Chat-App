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
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Container } from "@mui/material";

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBarLayout />,
      children: [
        {
          index: true,
          element: user ? <Navigate to="/chat" /> : <Navigate to="/login" />,
        },
        { path: "/chat", element: user ? <Chat /> : <Navigate to="/login" /> },
        {
          path: "/login",
          element: user ? <Navigate to="/chat" /> : <Login />,
        },
        {
          path: "/register",
          element: user ? <Navigate to="/chat" /> : <Register />,
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
