import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function Logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <img
          src="https://t4.ftcdn.net/jpg/03/46/77/57/360_F_346775711_wgofOdl8Z4DKi0FR9mBFRo1FK3kmMtC9.jpg"
          alt="Logo"
          className="w-8 h-8 mr-2"
        />
        <Link to={"/"} className="btn btn-ghost text-xl">
          Hacktiv chess
        </Link>
      </div>
      <div className="navbar-end">
        <button onClick={Logout} className="btn">
          Logout
        </button>
      </div>
    </div>
  );
}
