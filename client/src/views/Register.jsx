import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleClick() {
    navigate("/login");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const body = { username, password };
      await axios.post("http://localhost:3000/register", body);
    } catch (error) {}
  }

  return (
    <>
      <div className="p-10">
        <h1 className="mb-8 font-extrabold text-4xl">Register</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block font-semibold" htmlFor="name">
                Name
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
                id="name"
                type="text"
                name="name"
                required="required"
              />
            </div>
            <div className="mt-4">
              <label className="block font-semibold" htmlFor="password">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
                id="password"
                type="password"
                name="password"
                required="required"
                autoComplete="new-password"
              />
            </div>
            <div className="flex items-center justify-between mt-8">
              <button
                type="submit"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Register
              </button>
              <a onClick={handleClick} className="font-semibold">
                Already registered?
              </a>
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
