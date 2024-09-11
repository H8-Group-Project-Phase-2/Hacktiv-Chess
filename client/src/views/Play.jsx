import { useEffect, useContext } from "react";
import ChessBoard from "../components/ChessBoard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { colorContext } from "../context/ColorContext";

export default function Play({socket}) {
  const { roomId } = useParams()
  const { setCurrentColor } = useContext(colorContext);

  useEffect(() => {
    socket.connect();

    joinRoom()

    return () => {
      socket.disconnect()
    }
  }, [])

  async function joinRoom() {
    try {
      const { data } = await axios.get(`${url}/rooms/${roomId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })

      if (data["Host ID"].username === localStorage.getItem("username")) {
        socket.emit("join", roomId)
      } else if (data["Opponent ID"].username === localStorage.getItem("username")){
        socket.emit("join", roomId)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <ChessBoard socket={socket}/>
    </>
  );
}
