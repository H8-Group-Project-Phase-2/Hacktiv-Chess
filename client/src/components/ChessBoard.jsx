import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";
import { useEffect, useState, useRef, useContext } from "react";
import { colorContext } from "../context/ColorContext";

export default function ChessBoard({ socket, roomId }) {
  const [fen, setFen] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  );
  const [checkSquare, setCheckSquare] = useState();
  const { currentColor } = useContext(colorContext);

  let game = useRef(null);

  useEffect(() => {
    socket.connect();

    // game.current = new Chess();

    socket.emit("fetchInitialPosition", roomId);

    socket.on("position:update", (fen) => {
      console.log(fen);
      setFen(fen);

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

  useEffect(() => {
    socket.emit("position:new", roomId, fen);
    if (!game.current) game.current = new Chess(fen);
  }, [fen]);

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
