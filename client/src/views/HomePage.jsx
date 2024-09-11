import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CardRoom from "../components/CardRoom";
import { colorContext } from "../context/ColorContext";

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
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCreateRoom = () => {
    setCurrentColor("white");
    navigate("/room-form");
  };

  return (
    <div class="flex flex-col justify-start">
      <button
        onClick={handleCreateRoom}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create room
      </button>
      <button
        onClick={fetchRooms}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Refresh Room
      </button>
      <main className="flex flex-wrap justify-start gap-5">
        {rooms.length > 0 &&
          rooms.map((room) => {
            return <CardRoom room={room} url={url} />;
          })}
      </main>
    </div>
  );
}
