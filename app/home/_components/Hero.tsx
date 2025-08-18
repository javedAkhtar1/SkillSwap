import { Button } from "@/components/ui/button";
import React from "react";

function Hero() {
  return (
    <section className="min-h-screen flex justify-center items-center w-full bg-gradient-to-tr from-[#FAF9F6] to-blue-100 px-4 sm:px-6">
      <div className="h-full mx-auto py-10 md:py-0 max-w-7xl flex flex-col justify-center items-center gap-4 md:gap-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-900 font-poppins text-center">
          Welcome to Skill<span className="text-black">Swap</span>
        </h1>
        <p className="max-w-2xl text-center text-gray-600 text-base sm:text-lg font-nunito leading-relaxed">
          SkillSwap is a platform where people connect to teach what they know
          and learn what they don&apos;t—for free. Whether it&apos;s coding, design,
          music, or language exchange, you can find someone to swap skills with,
          build connections, and grow together.
        </p>
        <Button
          variant="default"
          className="bg-primary-btn hover:bg-primary-btn-hover text-lg sm:text-xl hover:text-black font-semibold cursor-pointer w-[250px] px-6 py-4 sm:px-10 sm:py-6 transition-colors duration-200"
        >
          Get Started
        </Button>
      </div>
    </section>
  );
}

export default Hero;