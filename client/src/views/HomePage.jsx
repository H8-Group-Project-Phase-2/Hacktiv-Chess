import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CardRoom from "../components/CardRoom";
import { colorContext } from "../context/ColorContext";
import { themeContext } from "../context/ThemeContext";
import Swal from "sweetalert2";

export default function HomePage({ url }) {
  const [rooms, setRooms] = useState([]);
  const { setCurrentColor } = useContext(colorContext);
  const navigate = useNavigate();

  async function fetchRooms() {
    try {
      const { data } = await axios.get(`${url}/rooms/`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setRooms(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCreateRoom = () => {
    setCurrentColor("white");
    navigate("/room-form");
  };

  const { currentTheme, theme } = useContext(themeContext);

  return (
    <div className="min-h-screen" data-theme={theme[currentTheme].dataTheme}>
      <div classnam="flex flex-col justify-start">
        <div className="flex justify-between">
          <button
            onClick={handleCreateRoom}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Room
          </button>

          <button
            onClick={fetchRooms}
            className={`${
              theme[currentTheme].dataTheme === "light"
                ? "text-black"
                : "text-white"
            } bg-opacity-100 px-4 py-2 rounded flex items-center`}
          >
            <svg
              className={`animate-spin h-5 w-5 mr-2 ${
                theme[currentTheme].dataTheme === "light"
                  ? "text-black"
                  : "text-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>
        <div className="flex justify-end"></div>

        <main className="flex flex-wrap justify-start gap-5">
          {rooms.length > 0 &&
            rooms.map((room) => {
              return <CardRoom room={room} url={url} />;
            })}
        </main>
      </div>
    </div>
  );
}
