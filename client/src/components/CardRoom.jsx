import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { colorContext } from "../context/ColorContext";
import { themeContext } from "../context/ThemeContext";

export default function CardRoom({ url, room }) {
  const [password, setPassword] = useState();
  const { setCurrentColor } = useContext(colorContext);

  const navigate = useNavigate();

  async function handleJoin(e) {
    try {
      e.preventDefault();

      await axios.patch(
        `${url}/rooms/${room.id}`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setCurrentColor("black");
      navigate(`/play/${room.id}`);
    } catch (error) {
      console.log(error);
    }
  }
  const { currentTheme, theme } = useContext(themeContext);

  return (
    <div className="relative bg-gray-900 block p-6 border border-gray-200 rounded-lg max-w-sm mt-24 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />

      <div className="my-4">
        <h2 className="text-white text-2xl font-bold pb-2">{room.id}</h2>
        <p className="text-white opacity-90">{room["Host ID"].username}</p>
      </div>

      <div
        className={`${
          theme[currentTheme].dataTheme === "light"
            ? "text-black"
            : "text-white"
        } bg-opacity-100 px-4 py-2 rounded flex items-center space-x-4`}
      >
        <input
          type="text"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleJoin}
        >
          Join Room
        </button>
      </div>
    </div>
  );
}
