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
  );
}
