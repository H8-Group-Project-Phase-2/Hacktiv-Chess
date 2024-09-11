export default function CardRoom() {
  return (
    <a
      className="relative bg-gray-900 block p-6 border border-gray-100 rounded-lg max-w-sm mx-auto mt-24"
      href="#"
    >
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
      <div className="my-4">
        <h2 className="text-white text-2xl font-bold pb-2">Card Title</h2>
      </div>
      <div className="flex justify-end">
        <button className="px-2 py-1 text-white border border-gray-200 font-semibold rounded hover:bg-gray-800">
          Join Room
        </button>
      </div>
    </a>
  );
}
