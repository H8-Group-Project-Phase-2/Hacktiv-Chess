import Navbar from "../componnents/Navbar";
import { Outlet } from "react-router-dom";

export default function BaseLayOut() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
