<<<<<<< HEAD
export default function HomePage() {


  // if (loading) {
  //   return (
  //     <>
  //       <section className="flex justify-center items-center" >
  //         {/* <img src={gifLoading} /> */}
  //         <h1>
  //           loading woiiii!!!
  //         </h1>
  //       </section>
  //     </>
  //   );
  // }

  return (
    <>
      <div id="PAGE-HOME" className="p-3">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center bg-gray-100 py-20 mt-12">
          <h1 className="text-4xl font-bold mb-4">HACTIVE-CHEST</h1>
          <p className="text-lg mb-6">Find your game</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-blue-700 transition"
            // onClick={getAiPrompt}
          >
            Are You Ready Now?
          </button>
          <p className="mt-12 text-sm ">
            ONLY BRAVE PERSON CAN JOIN THIS APPS{" "}
            <span className="text-purple-600 font-bold">tHINK ABOUT IT</span>{" "}
          
          </p>
        </section>

        {/* {JSON.stringify(jobs)} */}
        {/* Indikator Loading */}
        
      </div>
    </>
=======
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
>>>>>>> 8429430b21f8b64c5f44f036a5bcedb3c316e638
  );
}
