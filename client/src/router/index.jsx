import { createBrowserRouter } from "react-router-dom";
import Register from "../views/Register";
import Play from "../views/Play";
import Login from "../views/Login";

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
]);

export default router;
