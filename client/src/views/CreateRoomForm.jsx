import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateRoomForm({url}) {
  const [password, setPassword] = useState();
  const navigate = useNavigate()

  async function handleCreateRoom(e) {
    try {
      e.preventDefault()

      const { data } = await axios.post(`${url}/rooms`, {password}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })

      navigate(`/play/${data.id}`)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="max-w-xl mx-auto p-4 shadow-lg rounded-lg bg-white" onSubmit={(e) => handleCreateRoom(e)}>
      <h2 className="text-2xl font-bold mb-4">Create Room</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Create room
      </button>
    </form>
  );
}
