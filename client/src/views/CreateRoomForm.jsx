export default function CreateRoomForm() {
  return (
    <form className="max-w-xl mx-auto p-4 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Create room</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">password</label>
        <input type="password" className="w-full px-3 py-2 border rounded-lg" />
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
