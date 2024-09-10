import { createBrowserRouter } from "react-router-dom";
import Register from "../views/Register";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
