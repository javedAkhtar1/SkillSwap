import React from "react";

function Home() {
  return (
    <section className="h-[50vh] w-full bg-gradient-to-tr from-[#FAF9F6] to-blue-100">
      <div className="h-full mx-auto p-5 max-w-7xl flex flex-col justify-center items-center gap-4">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-900 font-poppins text-center">
          Welcome to Skill<span className="text-black">Swap</span>
        </h1>
        <p className="max-w-2xl text-center text-gray-600 text-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam
          error dolore odio harum dolorem officia, minus hic eligendi tempore
          at? Totam, delectus. Dicta ea, recusandae maiores optio quae
          asperiores rerum!
        </p>
      </div>
    </section>
  );
}

export default Home;
