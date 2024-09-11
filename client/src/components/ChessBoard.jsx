import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";
import { useEffect, useState, useRef, useContext } from "react";
import { colorContext } from "../context/ColorContext";

export default function ChessBoard({ socket }) {
  const [fen, setFen] = useState("start");
  const [checkSquare, setCheckSquare] = useState();
  const { currentColor, color, setCurrentColor } = useContext(colorContext);

  let game = useRef(null);

  useEffect(() => {
    socket.connect();

    game.current = new Chess();

    socket.on("position:update", (move) => {
      console.log(move);

      game.current.move(move);
      setFen(game.current.fen());

      if (game.current.inCheck()) {
        const kingSquare = findKingSquare(game.current);
        setCheckSquare(kingSquare);
      } else {
        setCheckSquare(null);
      }
    });

    return () => {
      socket.off("position:update");
      socket.disconnect();
    };
  }, []);

  const onDrop = ({ sourceSquare, targetSquare }) => {
    try {
      let move = {
        from: sourceSquare,
        to: targetSquare,
      };

      const sideColor = currentColor[0]

      if (game.current.get(sourceSquare).color !== sideColor) {
        throw new Error()
      }

      game.current.move(move);

      setFen(game.current.fen());

      if (game.current.inCheck()) {
        const kingSquare = findKingSquare(game.current);
        setCheckSquare(kingSquare);
      } else {
        setCheckSquare(null);
      }

      socket.emit("position:new", move);
    } catch (error) {
      setFen(game.current.fen());
      console.log(error);
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

  return (
    <div>
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
