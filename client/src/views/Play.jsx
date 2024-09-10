import ChessBoard from "../components/ChessBoard";

export default function Play({socket}) {
  return (
    <>
      <ChessBoard socket={socket}/>
    </>
  );
}
