import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

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
