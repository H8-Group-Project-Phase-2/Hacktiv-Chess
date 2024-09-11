export default function HomePage() {
  return (
    <>
      <div id="PAGE-HOME" className="p-3">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center bg-gray-100 py-20 mt-12">
          <h1 className="text-4xl font-bold mb-4">HACTIVE-CHEST</h1>
          <p className="text-lg mb-6">Find your game</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-blue-700 transition"
            onClick={getAiPrompt}
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
        {loading ? (
          <div className="mt-32 flex justify-center items-center">
            {/* <img src={magnifyingGlass} alt="Loading..." /> */}
            <h1>loading yee bos</h1>
          </div>
        ) : (
          // <main className="grid grid-cols-3 gap-5 px-10 my-8 bg-white">
          //   {myjob.map((job) => (
          //     <Card key={job.id} job={job} url={url} fetchMyJob={fetchMyJob} />
          //   ))}
          // </main>
          // 
        
      </div>
    </>
  );
}
