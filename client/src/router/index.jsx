import { createBrowserRouter } from "react-router-dom";
import Register from "../views/Register";
import Login from "../views/Login";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
