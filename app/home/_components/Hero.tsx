import { Button } from "@/components/ui/button";
import React from "react";

function Hero() {
  return (
    <section className="min-h-screen flex justify-center items-center w-full bg-gradient-to-tr from-[#FAF9F6] to-blue-100">
      <div className="h-full mx-auto p-5 max-w-7xl flex flex-col justify-center items-center gap-4">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-900 font-poppins text-center">
          Welcome to Skill<span className="text-black">Swap</span>
        </h1>
        <p className="max-w-2xl text-center text-gray-600 text-lg font-nunito">
          SkillSwap is a platform where people connect to teach what they know
          and learn what they don’t-for free. Whether it’s coding, design,
          music, or language exchange, you can find someone to swap skills with,
          build connections, and grow together.
        </p>
        <Button
          variant="default"
          className="bg-primary-btn hover:bg-primary-btn-hover text-xl hover:text-black font-semi-bold cursor-pointer w-[250px] px-10 py-6"
        >
          Get Started
        </Button>
      </div>
    </section>
  );
}

export default Hero;
