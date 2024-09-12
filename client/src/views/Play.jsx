import { useEffect, useContext } from "react";
import ChessBoard from "../components/ChessBoard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { colorContext } from "../context/ColorContext";

export default function Play({socket, url}) {
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
        setCurrentColor("white")
        console.log("9898988988988989")
      } else if (data["Opponent ID"].username === localStorage.getItem("username")){
        socket.emit("join", roomId)
        setCurrentColor("black")
      }
      
    } catch (error) {
      console.log(error)
      Toastify({
        text: error.response?.data?.error || "Join Failed",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: " bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  return (
    <>
      <ChessBoard socket={socket} roomId={roomId}/>
    </>
  );
}
