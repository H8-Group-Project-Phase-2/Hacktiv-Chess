import { useEffect, useState } from "react";
import ChessBoard from "../components/ChessBoard";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Play({socket}) {
  const [room, setRoom] = useState()
  const { roomId } = useParams()

  useEffect(() => {
    socket.connect();

    getRoom()

    return () => {
      socket.disconnect()
    }
  }, [])

  async function getRoom() {
    try {
      const { data } = await axios.get(`${url}/rooms/${roomId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })

      if (data["Host ID"].username === localStorage.getItem("username")) {
        socket.emit("create-room", roomId)
      } else {
        socket.emit("join-room")
      }
      
    } catch (error) {
      
    }
  }

  return (
    <>
      <ChessBoard socket={socket}/>
    </>
  );
}
