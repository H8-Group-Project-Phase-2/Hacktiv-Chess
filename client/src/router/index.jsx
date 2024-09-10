import { createBrowserRouter, redirect } from "react-router-dom";
import Register from "../views/Register";
import Play from "../views/Play";
import Login from "../views/Login";
import BaseLayOut from "../Layout/BaseLayOut";
import HomePage from "../views/HomePage";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/play",
    element: <Play />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <BaseLayOut />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
