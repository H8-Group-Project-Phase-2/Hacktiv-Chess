import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";
import { useState } from "react";

export default function ChessBoard() {
  const [game, setGame] = useState(new Chess());
  const [checkSquare, setCheckSquare] = useState(null); 

  const handleMove = ({ sourceSquare, targetSquare }) => {
    try {
      const gameCopy = new Chess(game.fen());
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", 
      });

      if (move) {
        setGame(gameCopy); 

        if (gameCopy.inCheck()) {
          const kingSquare = findKingSquare(gameCopy);
          setCheckSquare(kingSquare);
        } else {
          setCheckSquare(null);
        }
      }
    } catch (error) {
      null; 
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
        position={game.fen()}
        onDrop={handleMove}
        squareStyles={checkStyle} 
        showNotation={true}
        lightSquareStyle={{ backgroundColor: "rgb(238, 238, 213)" }}
        darkSquareStyle={{ backgroundColor: "rgb(124, 148, 92)" }}
      />
    </div>
  );
}
