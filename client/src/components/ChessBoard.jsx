import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";
import { useEffect, useState, useRef, useContext } from "react";
import { colorContext } from "../context/ColorContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function ChessBoard({ socket, roomId, url }) {
  const [fen, setFen] = useState("");
  const [checkSquare, setCheckSquare] = useState();
  const [winner, setWinner] = useState();
  const { currentColor } = useContext(colorContext);

  let game = useRef(null);

  useEffect(() => {
    socket.connect();

    socket.emit("initialize", roomId);

    socket.on("initialFen", (fen) => {
      setFen(fen);
    });

    socket.on("updatePosition", (fen) => {
      if (fen) {
        setFen(fen);

        if (game.current.inCheck()) {
          const kingSquare = findKingSquare(game.current);
          setCheckSquare(kingSquare);

          if (game.current.isCheckmate()) {
            let winnerSide;
            const loser = game.current.get(kingSquare).color;
            if (loser === "w") {
              setWinner("Black");
              winnerSide = "black";
            } else if (loser === "b") {
              setWinner("White");
              winnerSide = "white";
            }
          }
        } else {
          setCheckSquare(null);
        }
      }
    });

    // socket.on("sendCheckmate", (winner) => {
    //   console.log(winner, "WIN")
    //   setWinner(winner)
    // })

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (fen.length > 0) {
      game.current = new Chess(fen);

      socket.emit("currentPosition", fen, roomId);
    }
  }, [fen]);

  // useEffect(() => {

  // }, game.current.fen())

  const onDrop = ({ sourceSquare, targetSquare }) => {
    try {
      let move = {
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      };

      const sideColor = currentColor[0];

      if (game.current.get(sourceSquare).color !== sideColor) {
        throw new Error();
      }

      game.current.move(move);

      console.log("current fen is", game.current.fen());

      setFen(game.current.fen());

      if (game.current.inCheck()) {
        const kingSquare = findKingSquare(game.current);
        setCheckSquare(kingSquare);

        if (game.current.isCheckmate()) {
          let winnerSide;
          const loser = game.current.get(kingSquare).color;
          if (loser === "w") {
            setWinner("Black");
            winnerSide = "black";
          } else if (loser === "b") {
            setWinner("White");
            winnerSide = "white";
          }
        }
      } else {
        setCheckSquare(null);
      }
    } catch (error) {
      setFen(game.current.fen());
      console.log(error);
    } finally {
      // console.log("current fen on finally is", fen);
      // socket.emit("position:new", roomId, fen);
    }
  };

  const findKingSquare = (gameInstance) => {
    const board = gameInstance.board();
    const currentTurn = gameInstance.turn();

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.type === "k" && piece.color === currentTurn) {
          const file = String.fromCharCode(97 + col);
          const rank = 8 - row;
          return `${file}${rank}`;
        }
      }
    }
    return null;
  };

  const checkStyle = checkSquare
    ? { [checkSquare]: { backgroundColor: "red" } }
    : {};

  async function recordWinner(player, winner) {
    console.log(player, "dari record win");
    console.log(winner, "sama");

    if (player === winner.toLowerCase()) {
      await axios.patch(
        `${url}/winner`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );
    }
  }

  useEffect(() => {
    recordWinner(currentColor, winner);
  }, [winner]);

  return (
    <div>
      {winner && <h1>{`${winner} WIN !!!!`}</h1>}
      <Chessboard
        position={fen}
        onDrop={onDrop}
        squareStyles={checkStyle}
        showNotation={true}
        lightSquareStyle={{ backgroundColor: "rgb(238, 238, 213)" }}
        darkSquareStyle={{ backgroundColor: "rgb(124, 148, 92)" }}
        orientation={currentColor}
      />
    </div>
  );
}
