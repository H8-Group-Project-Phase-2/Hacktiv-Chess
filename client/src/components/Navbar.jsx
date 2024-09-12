import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();

  function Logout() {
    localStorage.clear();
    navigate("/login");
  }

  const { currentTheme, theme, setCurrentTheme } = useContext(themeContext);

  return (
    <div
      className="navbar bg-base-100"
      data-theme={theme[currentTheme].dataTheme}
    >
      <div className="navbar-start flex items-center">
        <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
        <Link to="/" className="btn btn-ghost text-xl">
          Hacktiv Chess
        </Link>
      </div>

      <div className="navbar-center">
        {currentTheme == "light" ? (
          <i
            onClick={() => setCurrentTheme("dark")}
            className="fa-xl fa-solid fa-moon cursor-pointer"
          ></i>
        ) : (
          <i
            onClick={() => setCurrentTheme("light")}
            className="fa-xl fa-solid fa-sun cursor-pointer"
          ></i>
        )}
      </div>

      <div className="navbar-end">
        <button
          onClick={Logout}
          className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
