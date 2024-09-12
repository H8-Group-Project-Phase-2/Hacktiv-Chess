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
    <div className="relative bg-gray-900 block p-6 border border-gray-100 rounded-lg max-w-sm mt-24">
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
      <div className="my-4">
        <h2 className="text-white text-2xl font-bold pb-2">{room.id}</h2>
        <p className="text-white">{room["Host ID"].username}</p>
      </div>
      <div
        className={`${
          theme[currentTheme].dataTheme === "light"
            ? "text-black"
            : "text-white"
        } bg-opacity-100 px-4 py-2 rounded flex items-center`}
      >
        <input
          type="text"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="px-2 py-1 text-white border border-gray-200 font-semibold rounded hover:bg-gray-800"
          onClick={handleJoin}
        >
          Join Room
        </button>
      </div>
    </div>
  );
}
