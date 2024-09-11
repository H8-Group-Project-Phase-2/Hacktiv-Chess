import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const body = { username, password };
      await axios.post("http://localhost:3000/register", body);
      navigate("/login");
    } catch (error) {}
  }

  return (
    <>
      <div className="p-10 bg-white">
        <h1 className="mb-8 font-semibold text-4xl text-gray-800">Register</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="text-gray-800" htmlFor="name">
                Name
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
                id="name"
                type="text"
                name="name"
              />
            </div>
            <div className="mt-4">
              <label className="text-gray-800" htmlFor="password">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
                id="password"
                type="password"
                name="password"
                autoComplete="new-password"
              />
            </div>
            <div className="flex items-center justify-between mt-8">
              <button
                type="submit"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white text-white bg-teal-500 border border-teal-500 md:py-4 md:text-lg md:px-10 rounded hover:bg-transparent hover:text-teal-500 transition uppercase font-roboto font-medium"
              >
                Register
              </button>
              <Link to={"/login"} className="text-gray-800">
                Already registered?
              </Link>
            </div>
          </form>
          <aside className="">
            <div className="bg-gray-100 p-8 rounded">
              <h2 className="font-bold text-2xl">Instructions</h2>
              <ul className="list-disc mt-4 list-inside">
                <li>
                  All users must provide a valid user name and password to
                  create an account.
                </li>
                <li>
                  Users must not use offensive, vulgar, or otherwise
                  inappropriate language in their username or profile
                  information
                </li>
                <li>
                  Users must not create multiple accounts for the same person.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
