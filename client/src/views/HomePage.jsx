import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HomePage({ url }) {
  const { roomId } = useParams();

  const [room, setRoom] = useState([]);

  const navigate = useNavigate();

  async function fetchData() {
    try {
      const { data } = await axios.get(`${url}/rooms/${roomId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
    } catch (error) {}
  }

  const handleCreateRoom = () => {
    navigate("/room-form");
  };
  return (
    <div class="flex justify-start">
      <button
        onClick={handleCreateRoom}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create room
      </button>
    </div>
  );
}
