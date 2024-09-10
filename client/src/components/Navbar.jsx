import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function Logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Hacktiv chess</a>
      </div>
      <div className="navbar-end">
        <a onClick={Logout} className="btn">
          Logout
        </a>
      </div>
    </div>
  );
}
