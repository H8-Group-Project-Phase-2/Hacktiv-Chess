import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CardRoom from "../components/CardRoom";

export default function HomePage({ url }) {
  const [rooms, setRooms] = useState([]);
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
      <main className="flex flex-wrap justify-start gap-5">
        {rooms.length > 0 &&
          rooms.map((room) => {
            return <CardRoom room={room} url={url} />;
          })}
      </main>
    </div>
  );
}
