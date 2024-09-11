import { createBrowserRouter, redirect } from "react-router-dom";
import { io } from 'socket.io-client'
import Register from "../views/Register";
import Play from "../views/Play";
import Login from "../views/Login";
import HomePage from "../views/HomePage";
import BaseLayOut from "../Layout/BaseLayOut";

const socket = io("http://localhost:3000", {
  autoConnect: false
});

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <BaseLayOut socket={socket}/>,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage socket={socket}/>,
      },
      {
        path: "/play",
        element: <Play socket={socket}/>,
      },
      {
        path: "/play",
        element: <Play />,
      },
    ],
  },
]);

export default router;
