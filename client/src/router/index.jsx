import { createBrowserRouter, redirect } from "react-router-dom";
import { io } from "socket.io-client";
import Register from "../views/Register";
import Play from "../views/Play";
import Login from "../views/Login";
import HomePage from "../views/HomePage";
import BaseLayOut from "../Layout/BaseLayOut";
import CreateRoomForm from "../views/CreateRoomForm";
import Toastify from "toastify-js";

const url = "http://localhost:3000";

const socket = io(url, {
  autoConnect: false,
});

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register url={url}/>,
  },
  {
    path: "/login",
    element: <Login url={url}/>,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "You are already logged in",
          duration: 2000,
          close: true,
          gravity: "top",
          position: "left",
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        ;
      }
      return null;
    },
  },
  {
    element: <BaseLayOut socket={socket} url={url}/>,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please login first",
          duration: 2000,
          close: true,
          gravity: "bottom",
          position: "left",
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage socket={socket} url={url}/>,
      },
      {
        path: "/play/:roomId",
        element: <Play socket={socket} url={url}/>,
      },
      {
        path: "/room-form",
        element: <CreateRoomForm url={url}/>,
      },
    ],
  },
]);

export default router;
