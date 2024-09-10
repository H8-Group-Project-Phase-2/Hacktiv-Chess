import { createBrowserRouter } from "react-router-dom";
import Register from "../views/Register";
import Play from "../views/Play";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/play",
    element: <Play />
  }
]);

export default router;
